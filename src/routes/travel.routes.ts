// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import TravelCtrl from '../controller/travel.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-C-travel')
    .post(TravelCtrl.create) // Creamos el viaje

router.route('/handler-AF-travel/:_id')
    .post(TravelCtrl.accept) // Aceptamos el viaje
    .put(TravelCtrl.finalized) // Finalizamos el viaje

router.route('/handdler-R-travel')
    .get(TravelCtrl.listAll) // Enlistamos todo

router.route('/handdler-RDD-travel/:_id')
    .get(TravelCtrl.findOneById) // Encontramos por el ID
    .post(TravelCtrl.disable) // Desabilitamos
    .delete(TravelCtrl.delete) // Eliminamos

export default router;