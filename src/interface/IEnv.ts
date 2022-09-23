export default interface IEnv {
    PORT_SERVER: number | string | undefined;
    MONGODB_URI: string | undefined;
    SECRET_SERVER: string;
    CAPTCHA_SECRET: string | undefined;
}