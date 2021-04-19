/**
 * ruta api/busquedas
 */

const { Router } = require('express');
const { getDocumentosColeccion } = require ('../controllers/busqueda.controllers');


const router = Router();

router.get('/coleccion/:tabla/:busqueda', getDocumentosColeccion)


module.exports = router;