// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import Captcha from '../controller/recaptcha.controller';

const router = Router();

router.route('/verify/:token')
    .post(Captcha.verifyCaptcha) // Se realiza la comprobación del recaptcha por el metodo POST

export default router;