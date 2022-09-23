import Hook from "../config/utils";
import VehicleModel from "../model/vehicle.model";
import UserModel from "../model/user.model";
import { ObjectId } from 'mongoose';

class VehicleCtrl {
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

  static async create(req: any, res: any) {
    const {
      propietario,
      placa,
      fecha_tarjeta_op,
      fecha_soat,
      cilindraje,
      capacidad,
      travel_status,
    } = req.body;
    const data = {
      propietario: Hook._length(propietario, 128, 4),
      placa: Hook._length(placa, 64, 3),
      fecha_tarjeta_op: Hook._length(fecha_tarjeta_op, 64, 1),
      fecha_soat: Hook._length(fecha_soat, 64, 1),
      cilindraje: Hook.isNumeric(cilindraje),
      capacidad: Hook.isNumeric(capacidad),
      travel_status: Hook._length(travel_status, 128, 1),
    };
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    if (!await VehicleCtrl.validationUser(propietario))
      return res.json(Hook.Message(true, 401, "Usuario no autorizado"));
    const _new = await VehicleModel.create(data);
    return res.json(_new);
  }

  static async listAll(req: any, res: any) {
    const { propietario } = req.params;
    return res.json(await VehicleModel.listAll(propietario));
  }

  static async findOneById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await VehicleModel.findOneById(_id));
  }

  static async modify(req: any, res: any) {
    const { _id, propietario } = req.params;
    const {
      placa,
      fecha_tarjeta_op,
      fecha_soat,
      cilindraje,
      capacidad,
      travel_status,
    } = req.body;
    const data = {
      placa: Hook._length(placa, 64, 3),
      fecha_tarjeta_op: Hook._length(fecha_tarjeta_op, 64, 1),
      fecha_soat: Hook._length(fecha_soat, 64, 1),
      cilindraje: Hook.isNumeric(cilindraje),
      capacidad: Hook.isNumeric(capacidad),
      travel_status: Hook._length(travel_status, 128, 1),
    };
    const strObject = await Hook.structureObject(data);
    if (!strObject || !_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    if (!await VehicleCtrl.validationUser(propietario))
      return res.json(Hook.Message(true, 401, "Usuario no autorizado"));
    return res.json(await VehicleModel.modify(strObject, {_id, propietario}));
  }

  static async disable(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await VehicleModel.disable(_id));
  }

  static async delete(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await VehicleModel.delete(_id));
  }
}
export default VehicleCtrl;
