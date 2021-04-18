/**
 * Ruta: /api/nomina
 */
 const { Router } = require('express');

 const {
    generarNomina, 
    obtenerNominas, 
    obtenerNomina,
    eliminarNomina,
    reporteNomina
} = require('../controllers/nomina.controllers')

 const router = Router();
 

 //Obtener nominas
router.get('/', obtenerNominas);

 //Obtener nomina por empleado
router.get('/:id', obtenerNomina);
 
 //Generar nomina
 router.post('/', generarNomina );

 //eliminar nomina
 router.delete('/:id', eliminarNomina );

 //Generar Reporte de nomina
 router.get('/reporte/:id', reporteNomina);
 

     
 
 
 
 
 
 
 
 module.exports = router;