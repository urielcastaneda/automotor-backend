import { ObjectId } from "mongoose";
import Hook from "../config/utils";
import AccessPages from "./schema/access-pages.schema";

class AccessPagesModel {
    static createNewPage(data: any) {
        const page = new AccessPages(data);
        return page.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo la pagina correctamente");
            }).catch(err => {
                console.log(err);
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static listAllPages() {
        return AccessPages.find()
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Se obtuvieron todas las paginas", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static findOnePageByPath(path: string) {
        return AccessPages.find({ path })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
    static findOnePageById(_id: ObjectId) {
        return AccessPages.find({ _id })
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static modifyOneAccessPage(data: any, _id: ObjectId) {
        return AccessPages.findByIdAndUpdate(_id, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disableAccessPages(_id: ObjectId) {
        return AccessPages.findByIdAndUpdate(_id, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static deleteAccessPage(_id: ObjectId) {
        return AccessPages.findByIdAndRemove(_id)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default AccessPagesModel;