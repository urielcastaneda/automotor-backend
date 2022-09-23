import { ObjectId } from "mongoose";
import Hook from "../config/utils";
import RolPages from "./schema/rol.schema";

class RolModel {
    static createNewRol(data: any) {
        const page = new RolPages(data);
        return page.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo el correctamente");
            }).catch(err => {
                console.log(err);
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static listAllRol() {
        return RolPages.find()
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Se obtuvieron todas los roles", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneRolById(_id: ObjectId) {
        return RolPages.find({ _id })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static modifyOneRol(data: any, _id: ObjectId) {
        return RolPages.findByIdAndUpdate(_id, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disableRol(_id: ObjectId) {
        return RolPages.findByIdAndUpdate(_id, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static deleteRol(_id: ObjectId) {
        return RolPages.findByIdAndRemove(_id)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default RolModel;