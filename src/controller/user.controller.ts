import Hook from "../config/utils";
import UserModel from "../model/user.model";
import { IToken, IDataUser } from "../interface/IToken";
import RolModel from "../model/rol.model";
import tokenAuth from "../middleware/token-auth.middleware";

class UserCtrl {
  static async createNewUser(req: any, res: any) {
    const { email, password, name, last_name, role } = req.body;
    const data = {
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
      name: Hook._length(name, 64, 1),
      last_name: Hook._length(last_name, 64, 1),
      role: Hook._length(role, 128, 1),
    };
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    const _new = await UserModel.createNewUser(data);
    return res.json(_new);
  }

  static async listAllUsers(req: any, res: any) {
    return res.json(await UserModel.listAllUsers());
  }

  static async findOneById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.findOneById(_id));
  }

  static async login(req: any, res: any) {
    // Login de la persona
    const { email, password } = req.body;
    const data = {
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
    };
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    const getUser = await UserModel.findOneUserByLogin(email);
    if (
      !getUser ||
      getUser.error ||
      getUser.statusCode != 200 ||
      !getUser.payload
    )
      return res.json(getUser);
    if (getUser.payload.length <= 0 || getUser.payload.password != password)
      return res.json(
        Hook.Message(true, 401, "Usuario o Contraseña incorrectos")
      );

    // Si el usuario es encontrado y la contraseña coincide, entonces
    // Retornamos el token
    // Obtenemos las rutas asociadas al rol del usuario
    const role = await RolModel.findOneRolById(getUser.payload.role.toString());
    if (
      !role ||
      role.error ||
      role.statusCode != 200 ||
      role.payload.length <= 0
    )
      return res.json(role);
    const { toFront, toBack, name } = role.payload[0];
    const access_page = {
      toFront,
      toBack,
    };
    const token = await tokenAuth.createTokenAuth({
      access_page,
      _id: getUser.payload._id,
      iat: Hook.getTime(30),
      role: name,
    });
    const dataUser: IDataUser = {
      name: getUser.payload.name,
      lastname: getUser.payload.last_name,
      email: getUser.payload.email,
    };
    return res.json(
      Hook.Message(false, 200, "Token", { token, dataUser })
    );
  }

  static async modify(req: any, res: any) {
    const { _id } = req.params;
    const { email, password, name, last_name, role, status } = req.body;
    const data = {
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
      name: Hook._length(name, 64, 1),
      last_name: Hook._length(last_name, 64, 1),
      role: Hook._length(role, 15, 1),
      status: Hook.isBoolean(status),
    };
    const strObject = await Hook.structureObject(data);
    if (!strObject || !_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.modifyOneUser(strObject, _id));
  }

  static async disable(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.disable(_id));
  }

  static async delete(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.delete(_id));
  }
}
export default UserCtrl;
