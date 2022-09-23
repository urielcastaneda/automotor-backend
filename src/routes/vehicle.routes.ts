// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import VehicleCtrl from '../controller/vehicle.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-C-vehicle')
    .post(VehicleCtrl.create) // Creamos nuevo

router.route('/handdler-R-vehicle/:propietario')
    .get(VehicleCtrl.listAll) // Enlistamos todo

router.route('/handdler-U-vehicle/:_id/:propietario')
    .put(VehicleCtrl.modify) // Modificamos

router.route('/handdler-RDD-vehicle/:_id')
    .get(VehicleCtrl.findOneById) // Encontramos por el ID
    .post(VehicleCtrl.disable) // Desabilitamos
    .delete(VehicleCtrl.delete) // Eliminamos

export default router;