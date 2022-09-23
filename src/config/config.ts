import { config } from 'dotenv';
import IEnv from '../interface/IEnv';
config();
const env: IEnv = {
    PORT_SERVER : process.env.PORT_SERVER || 8000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/prueba_desarrollo",
    SECRET_SERVER: process.env.SECRET_SERVER || "prueba_desarrollo",
    CAPTCHA_SECRET: process.env.CAPTCHA_SECRET || "6LcYfxsiAAAAALE_y7wKt6obSfO9f1k53bFoMoSm",
}
export default env;