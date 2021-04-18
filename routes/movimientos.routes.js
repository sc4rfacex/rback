/**
 * Ruta: /api/movimientos
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middleware/validar-campos');
 
 const {
    obtenerMovimientos,
    insertarMovimiento,
    actualizarMovimiento,
    borrarMovimiento 
} = require('../controllers/movimientos.controllers')

 const router = Router();
 
 //Obtener todos los movimientos
 router.get('/', obtenerMovimientos );
 
 //Insertar movimiento
 router.post('/', 
     [
         check('fecha', 'La fecha del movimiento es obligatoria').not().isEmpty(),
         check('cantidadEntregas', 'La cantidad de entregas es obligatoria').not().isEmpty(),
         validarCampos,
     ], 
     insertarMovimiento 
 );
 
 // Actualizar movimientos
 router.put('/:id', 
     [
         check('numeroEmpleado', 'El numero del empleado es obligatorio').not().isEmpty(),
         check('nombreEmpleado', 'El nombre del empleado es obligatorio').not().isEmpty(),
         check('rolEmpleado', 'El rol del empleado es obligatorio').not().isEmpty(),
         check('tipoEmpleado', 'El tipo del empleado es obligatorio').not().isEmpty(),
         validarCampos,
     ], 
     actualizarMovimiento 
 );
 
 // Borrar movimientos
 router.delete('/:id', borrarMovimiento );
     
 
 
 
 
 
 
 
 module.exports = router;