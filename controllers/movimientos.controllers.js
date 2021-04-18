const { response } = require('express');
const Movimiento = require('../models/movimiento.model');
const Empleado = require('../models/empleado.model');
const { obtenerEmpleado } = require('../controllers/empleados.controllers');


const obtenerMovimientos = async ( req, res = response ) => {

    const movimientos = await Movimiento.find()
                                        .populate( 'empleado', 'nombreEmpleado rolEmpleado tipoEmpleado' );

    res.json({
        ok:true,
        movimientos
    })
}

const insertarMovimiento = async ( req, res = response ) => {

    const {numeroEmpleado}  = req.body;

    try {
        

        const empleado = await Empleado.findOne( {numeroEmpleado} );
        
        if( !empleado ){
            res.status(404).json({
                ok:false,
                msg:'No se encuentra registrado ese empleado'
            });
        }

        const existeMovimiento = await Movimiento.findOne({ 
            empleado: empleado._id, 
            fecha: req.body.fecha
        });

        if( existeMovimiento ){
            res.status(400).json({
                ok:false,
                msg:'Ya se encuentra registrado un movimiento de ese empleado el dia de hoy'
            })
        } else {
            const movimiento = new Movimiento ({
                empleado: empleado._id,
                ...req.body
            });
    
    
            const movimientoDB = await movimiento.save();
    
            res.json({
                ok:true,
                movimientoDB
            });
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo insertar el movimiento'
        })
    }

}

const actualizarMovimiento = ( req, res = response ) => {
    res.json({
        ok:true,
        msg: 'actualizarMovimiento movimientos'
    })
}

const borrarMovimiento = ( req, res = response ) => {
    res.json({
        ok:true,
        msg: 'borrarMovimiento movimientos'
    })
}

module.exports = {
    obtenerMovimientos,
    insertarMovimiento,
    actualizarMovimiento,
    borrarMovimiento
}