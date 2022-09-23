import { ObjectId } from "mongoose";
import Hook from "../config/utils";
import Vehicle from "./schema/vehicle.schema";

class VehicleModel {
    static create(data: any) {
        const child = new Vehicle(data);
        return child.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo el correctamente");
            }).catch(err => {
                console.log(err);
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static listAll(propietario: ObjectId) {
        return Vehicle.find({ propietario })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Listado", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneById(_id: ObjectId) {
        return Vehicle.find({ _id })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static modify(data: any, query: any) {
        return Vehicle.findByIdAndUpdate(query, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disable(_id: ObjectId) {
        return Vehicle.findByIdAndUpdate(_id, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static delete(_id: ObjectId) {
        return Vehicle.findByIdAndRemove(_id)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default VehicleModel;