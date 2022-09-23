import { ObjectId } from "mongoose";
import Hook from "../config/utils";
import Travel from "./schema/travel.schema";

class TravelModel {
    static create(data: any) {
        const child = new Travel(data);
        return child.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo el correctamente");
            }).catch(err => {
                console.log(err);
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static listAll() {
        return Travel.find({ travel_status: 'wait', status: true })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Listado", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneById(_id: ObjectId) {
        return Travel.find({ _id })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static modify(data: any, query: any) {
        return Travel.findByIdAndUpdate(query, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disable(_id: ObjectId) {
        return Travel.findByIdAndUpdate(_id, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static delete(_id: ObjectId) {
        return Travel.findByIdAndRemove(_id)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default TravelModel;