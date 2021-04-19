const Empleado = require('../models/empleado.model');
const Movimiento = require('../models/movimiento.model');
const Nomina = require('../models/nomina.model');

const getDocumentosColeccion = async ( req, res = response ) => {
  
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    
    let data = [];

    switch( tabla ){
        case 'empleados':
            data = await Empleado.find({ numeroEmpleado: busqueda });
        break;

        case 'movimientos':
            data = await Movimiento.find({ numeroEmpleado: busqueda });

        break;

        case 'nominas':
            data = await Nomina.find({ numeroEmpleado: busqueda });

        break;

        default:
            return res.status(400).json({
                ok:false,
                msg:'No existe esa coleccion'
            });
        }

    res.json({
        ok:true,
        resultados: data
    });

} 

module.exports = {
    getDocumentosColeccion
}