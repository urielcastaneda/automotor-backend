// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import RolCtrl from '../controller/rol.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-CR-rol')
    .get(RolCtrl.listAllRol) // Enlistamos todas las paginas
    .post(RolCtrl.createNewRol) // Creamos nueva pagina

router.route('/handdler-RUDD-rol/:_id')
    .get(RolCtrl.findOneRolById) // Encontramos una pagina por el ID
    .put(RolCtrl.modifyOneRol) // Modificamos el acceso de alguna pagina
    .post(RolCtrl.disableRol) // Desabilitamos el acceso a una pagina
    .delete(RolCtrl.deleteRol) // Eliminamos una pagina

export default router;