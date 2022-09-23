import Hook from "../config/utils";
import TravelModel from "../model/travel.model";
import { ObjectId } from "mongoose";
import UserModel from "../model/user.model";
import VehicleModel from "../model/vehicle.model";

class TravelCtrl {
  static async validationUser(_id: ObjectId) {
    // Validamos la existencia del usuario
    const propUser = await UserModel.findOneById(_id);
    if (
      !propUser ||
      propUser.error ||
      !propUser.payload ||
      propUser.payload.length <= 0
    )
      return false;
    return true;
  }

  // Validación de existencia del vehicle
  static async validateVehicle(_id: ObjectId) {
    const vehicle = await VehicleModel.findOneById(_id);
    if (
      !vehicle ||
      vehicle.error ||
      vehicle.statusCode != 200 ||
      !vehicle.payload ||
      vehicle.payload.length <= 0
    )
      return false;
    return vehicle.payload[0].travel_status && vehicle.payload[0].status;
  }

  // Validación de existencia del viaje
  static async validateTravel(_id: ObjectId, travel_status: string) {
    const travel = await TravelModel.findOneById(_id);
    if (
      !travel ||
      travel.error ||
      travel.statusCode != 200 ||
      !travel.payload ||
      travel.payload.length <= 0
    )
      return false;
    if (!travel.payload[0].travel_status || !travel.payload[0].status) return false;
    return travel.payload[0].travel_status === travel_status;
  }

  static async create(req: any, res: any) {
    const { client, comment, location_init, location_end } = req.body;
    const data = {
      client: Hook._length(client, 128, 4),
      comment: Hook._length(comment, 400, 5),
      location_init,
      location_end,
      data_init: new Date().toISOString(),
      travel_status: "wait",
    };
    const dataVerify = Hook.verifyDataObject(data, ['location_init', 'location_end']);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    if (!(await TravelCtrl.validationUser(client)))
      return res.json(Hook.Message(true, 401, "Usuario no autorizado"));
    const _new = await TravelModel.create(data);
    return res.json(_new);
  }

  // Funcion de aceptar un viaje
  static async accept(req: any, res: any) {
    const { _id } = req.params; // ID del viaje a aceptar
    const { vehicle } = req.body; // ID del vehiculo al que se le va a asignar el viaje

    // Si la validación del vehiculo da incorrecto
    if (!(await TravelCtrl.validateVehicle(vehicle)))
      return res.json(Hook.Message(true, 401, "Vehicle invalid"));
    // Si la validacion del vehiculo es correcta
    // Hacemos la validación del viaje
    if (!(await TravelCtrl.validateTravel(_id, "wait")))
      return res.json(Hook.Message(true, 401, "Travel invalid"));
    // Si la validación da que el viaje esta correcto, actualizamos los datos del viaje
    // Creamos los datos a modificar
    const data = {
      vehicle,
      date_ac: new Date().toISOString(),
      travel_status: "accept",
    };
    // Hacemos la modificación en el viaje
    const travelModify = await TravelModel.modify(data, { _id });
    // Comprobamos que se haga la modificacion
    if (travelModify.error || travelModify.statusCode != 200)
      return res.json(travelModify);
    // Cambiamos el estado del vehiculo
    await VehicleModel.modify({ travel_status: false }, { _id: vehicle });
    // Se acepta el viaje
    return res.json(
      Hook.Message(false, 200, "Se Acepto correctamente el viaje")
    );
  }

  // Finalización del viaje
  static async finalized(req: any, res: any) {
    const { _id } = req.params; // ID del viaje a Finalizar
    const { vehicle } = req.body; // ID del vehiculo al que se le va a asignar el viaje
    // Hacemos la validación del viaje
    if (!(await TravelCtrl.validateTravel(_id, "accept")))
      return res.json(Hook.Message(true, 401, "Travel invalid"));
    const data = {
      date_end: new Date().toISOString(),
      travel_status: "finalized",
      status: false
    };
    // Hacemos la modificación en el viaje
    const travelModify = await TravelModel.modify(data, { _id });
    // Comprobamos que se haga la modificacion
    if (travelModify.error || travelModify.statusCode != 200)
      return res.json(travelModify);
    await VehicleModel.modify({ travel_status: true }, { _id: vehicle });
    // Se acepta el viaje
    return res.json(
        Hook.Message(false, 200, "Se Finalizo correctamente el viaje")
    );
  }

  static async listAll() {
    return await TravelModel.listAll();
  }

  static async findOneById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await TravelModel.findOneById(_id));
  }

  static async disable(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await TravelModel.disable(_id));
  }

  static async delete(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await TravelModel.delete(_id));
  }
}
export default TravelCtrl;
