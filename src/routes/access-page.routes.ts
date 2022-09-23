// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import AccessPagesCtrl from '../controller/access-page.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-CR-access-page')
    .get(AccessPagesCtrl.listAllPages) // Enlistamos todas las paginas
    .post(AccessPagesCtrl.createNewPage) // Creamos nueva pagina

router.route('/handdler-RUDD-access-page/:_id')
    .get(AccessPagesCtrl.findOnePageById) // Encontramos una pagina por el ID
    .put(AccessPagesCtrl.modifyOneAccessPage) // Modificamos el acceso de alguna pagina
    .post(AccessPagesCtrl.disableAccessPages) // Desabilitamos el acceso a una pagina
    .delete(AccessPagesCtrl.deleteAccessPage) // Eliminamos una pagina

router.route('/handdler-R-access-page/:path')
    .get(AccessPagesCtrl.findOnePageByPath) // Encontramos una nueva pagina por el "path"

export default router;