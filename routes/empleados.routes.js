/**
 * Ruta: /api/empleados
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { obtenerEmpleados, obtenerEmpleado, insertarEmpleado, actualizarEmpleado, borrarEmpleado } = require('../controllers/empleados.controllers');

const router = Router();

//Obtener todos los empleados
router.get('/', obtenerEmpleados );

//Obtener un empelado en especifico
router.get('/:numeroEmpleado', obtenerEmpleado );

//Insertar empleado
router.post('/', 
    [
        check('numeroEmpleado', 'El numero del empleado es obligatorio').not().isEmpty(),
        check('nombreEmpleado', 'El nombre del empleado es obligatorio').not().isEmpty(),
        check('rolEmpleado', 'El rol del empleado es obligatorio').not().isEmpty(),
        check('tipoEmpleado', 'El tipo del empleado es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    insertarEmpleado 
);

// Actualizar empleado
router.put('/:numeroEmpleado', 
    [
        check('numeroEmpleado', 'El numero del empleado es obligatorio').not().isEmpty(),
        check('nombreEmpleado', 'El nombre del empleado es obligatorio').not().isEmpty(),
        check('rolEmpleado', 'El rol del empleado es obligatorio').not().isEmpty(),
        check('tipoEmpleado', 'El tipo del empleado es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    actualizarEmpleado 
);

router.delete('/:numeroEmpleado', borrarEmpleado );
    







module.exports = router;