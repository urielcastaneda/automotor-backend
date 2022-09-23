// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import UserCtrl from '../controller/user.controller';

const router = Router();

router.route('/login')
    .post(UserCtrl.login) // Se realiza el login del aplicativo

router.route('/register')
    .post(UserCtrl.createNewUser) // Se realiza el login del aplicativo

export default router;