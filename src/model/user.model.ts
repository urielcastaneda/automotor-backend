import Hook from '../config/utils';
import User from "./schema/user.schema";
import { ObjectId } from 'mongoose';

class UserModel {
    static createNewUser(data: any) {
        const user = new User(data);
        return user.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo el usuario correctamente");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static listAllUsers() {
        return User.find({})
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Se obtuvieron todas los usuarios", resp);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneUserByLogin(email: string) {
        return User.findOne({email})
            .then(user => {
                if (user) return Hook.Message(false, 200, "Usuario encontrado", user);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneById(_id: ObjectId | string) {
        return User.findById(_id, 'name last_name role status') // Solo vamos a pedir el role y el status
            .then(user => {
                if (user) return Hook.Message(false, 200, "Usuario encontrado", user);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            })
    }
    static modifyOneUser(data: any, _id: ObjectId) {
        return User.findByIdAndUpdate(_id, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disable(_id: ObjectId) {
        return User.findByIdAndUpdate(_id, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static delete(_id: ObjectId) {
        return User.findByIdAndRemove(_id)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default UserModel;