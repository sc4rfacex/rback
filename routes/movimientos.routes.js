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
    eliminarMovimiento 
} = require('../controllers/movimientos.controllers')

 const router = Router();
 
 //Obtener todos los movimientos
 router.get('/', obtenerMovimientos );
 
 //Insertar movimiento
 router.post('/', 
     [
        check('numeroEmpleado', 'El numero del empleado es obligatorio').not().isEmpty(),
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
         check('fecha', 'La fecha del movimiento es obligatoria').not().isEmpty(),
         check('cantidadEntregas', 'La cantidad de entregas es obligatoria').not().isEmpty(),
         validarCampos,
     ], 
     actualizarMovimiento 
 );
 
 // Borrar movimientos
 router.delete('/:id', eliminarMovimiento );
     
 
 
 
 
 
 
 
 module.exports = router;