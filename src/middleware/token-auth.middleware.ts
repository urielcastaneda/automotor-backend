import jwt from "jsonwebtoken";
import env from "../config/config";
import Hook from "../config/utils";

import UserModel from "../model/user.model";
import { IToken } from "../interface/IToken";
import { IToBack } from '../interface/IDataRol';

class tokenAuth {
  static createTokenAuth(payload: IToken): string {
    // Creamos el token de autentificación para los usuarios
    return jwt.sign(payload, env.SECRET_SERVER);
  }
  static verifyToken(bearerToken: string) {
    // Realizamos las verificaciones validas al token
    if (!bearerToken) return Hook.Message(true, 401, "Unauthorized"); // Debemos realizar el error correspondiente
    const tokenDess = bearerToken.split(" ")[1];
    try {
      const token: any = jwt.verify(tokenDess, env.SECRET_SERVER);
      if (!token.iat) return Hook.Message(true, 810, "Invalid Token");
      if (!this.verifyTimeToken(token.iat))
        return Hook.Message(true, 810, "Token Timed Out");
      return Hook.Message(false, 200, "Ok", token);
    } catch (error) {
      return Hook.Message(true, 810, "Invalid Token");
    }
  }

  static verifyTimeToken(iat: number) {
    // Verificamos el token por tiempo
    return new Date().getTime() < iat;
  }

  static pathValidToBack(toBack: any, url: string, _method: string): Boolean {
    url = url.split('/')[1];
    const res = toBack.find(([{ path, method }]: any) => path === url && method === _method);
    return !!res;
  }

  static async isLoggedIn(req: any, res: any, next: any) {
    const { authorization } = req.headers;
    const token: any = tokenAuth.verifyToken(authorization); // Realizamos la verificacion Superficial
    if (token.statusCode != 200 || !token.payload._id) return res.json(token); // Si da algun error lo imprimimos
    const user = await UserModel.findOneById(token.payload._id); // Buscamos el usuario en cuestion
    if (user.error || user.statusCode != 200) return res.json(user); // Si no existe el usuario en cuestion
    if (!user.payload.status)
      return res.json(Hook.Message(true, 500, "Disabled User")); // Si el usuario esta deshabilitado
   // Obtenemos las access_page de toBack
   const { toBack } = token.payload.access_page;
   if (!toBack || toBack.length <= 0) return res.json(Hook.Message(true, 500, "Disabled User Unhautorized"));
    const { url, method } = req;
    const validPath = tokenAuth.pathValidToBack(toBack, url, method);
    if (!validPath) return res.json(Hook.Message(true, 500, "Disabled User"));
    next();
  }
}

export default tokenAuth;
