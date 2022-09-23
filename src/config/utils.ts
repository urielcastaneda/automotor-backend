import IMessage from "../interface/IMessage";
class Utils {
  static Message(
    error: Boolean,
    statusCode: number,
    message: string,
    payload: Boolean | any = false
  ): IMessage {
    return {
      error,
      statusCode,
      message,
      payload,
    };
  }
  /* Realizamos todas las funciones relacionadas a la encriptación */
  static encrypt(value: string) {}

  /* Realizamos todo lo relacionado al tiempo */
  static getStimationTimeMins(timeNow: number, expiration_time_min: number) {
    const estimateTimeExpirationMin = expiration_time_min * 1000 * 60; // Calculamos los minutos pasados por el argurmento, lo transformamos a minutos
    return timeNow + estimateTimeExpirationMin; // Le establecemos esos minutos al tiempo actual
  }

  /* Verificamos el rol correspondiente */
  static isVerRol(req: any, rolArray: any) {
    const role = req.body.sessionID.role || "";
    return rolArray.filter((rol: any) => role === rol).length > 0;
  }

  /* Verificacion de las variables */
  static isNumeric(value: string) {
    return typeof value === "number" ? value : undefined;
  }
  static isString(value: string) {
    return typeof value === "string" ? value : undefined;
  }
  static isBoolean(value: any) {
    return typeof value === "boolean" ? value : undefined;
  }
  /* Verificamos la longitud del campo dado */
  static _length(value: any, max: number, min: number) {
    if (value === undefined) return undefined;
    if (typeof value == "object")
      return value.length <= max && value.length >= min ? value : undefined;
    value = value.toString();
    return value.length <= max && value.length >= min ? value : undefined;
  }
  /* Estructuramos los datos de un objeto */
  static structureObject(obj: any) {
    let response: any = {};
    Object.entries(obj).forEach(([key, val]) => {
      if (val !== undefined) response[key] = val;
    });
    return Object.entries(response).length > 0 ? response : undefined;
  }

  /* Verificacion del total de datos en un Array */
  static verifyDataObject = (obj: any, exception: string[] = []) => {
    let error: any = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (!exception.includes(<never>key)) {
        if (val === undefined || val === null) error.push(<never>key);
      }
    });
    return error.length === 0 ? true : error;
  };

  /* Obtenemos el tiempo deseado */
  static getTime = (min: number = 0) => {
    const miliseconds = 60000 * min;
    return new Date(new Date().getTime() + miliseconds).getTime();
  };
}

export default Utils;
