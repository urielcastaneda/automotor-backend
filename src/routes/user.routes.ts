// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import UserCtrl from '../controller/user.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-CR-user')
    .get(UserCtrl.listAllUsers) // Enlistamos todo
    .post(UserCtrl.createNewUser) // Creamos nuevo

router.route('/handdler-RUDD-user/:_id')
    .get(UserCtrl.findOneById) // Encontramos por el ID
    .put(UserCtrl.modify) // Modificamos
    .post(UserCtrl.disable) // Desabilitamos
    .delete(UserCtrl.delete) // Eliminamos

export default router;