import Hook from "../config/utils";
import env from "../config/config";
import request from 'request';

class RecaptchaCtrl {
  static async verifyCaptcha(req: any, res: any) {
    const { token } = req.params;
    if (!token) return res.json(Hook.Message(true, 400, "Invalid Token"));
    const recaptcha_url = "https://www.google.com/recaptcha/api/siteverify";
    const recaptcha_secret_key = env.CAPTCHA_SECRET;
    const payload: any = {
      secret: recaptcha_secret_key,
      response: token,
      remoteip: "localhost",
    };
    const response = request(
      `${recaptcha_url}?secret=${payload.secret}&response=${payload.response}&remoteip=${req.connection.remoteAddress}`,
      (err: any, res: any, body: any) => {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
            return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
      }
    );
    return res.json(response);
  }
}
export default RecaptchaCtrl;
