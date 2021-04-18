const { response } = require('express');
const Movimiento = require('../models/movimiento.model');
const Empleado = require('../models/empleado.model');


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

const actualizarMovimiento = async ( req, res = response ) => {
    const id = req.params.id;
    const {numeroEmpleado, _id, ...movimientoActualizar} = req.body;

    try {

        const empleado = await Empleado.findOne( {numeroEmpleado} );
        
        if( !empleado ){
            return res.status(404).json({
                ok:false,
                msg:'No se encuentra registrado ese empleado'
            });
        }
        
        const movimiento = await Movimiento.findById(id);

        console.log(movimiento);
        if ( !movimiento ){
            return res.status(404).json({
                ok: false,
                msg: 'El movimiento no existe'
            });
        }
     

        if( movimiento.numeroEmpleado !== numeroEmpleado || movimiento.fecha !== req.body.fecha) {
            const existeMovimiento = await Movimiento.findOne({ 
                numeroEmpleado: numeroEmpleado, 
                fecha: req.body.fecha
            });
            if( existeMovimiento ){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un movimiento con ese numero de empleado en esa fecha'
                });
            }
        }

        camposActualizar = {
            empleado: empleado._id,
            ...req.body
        }

        const idModificar = movimiento._id;
        
        const movimientoActualizado = await Movimiento.findByIdAndUpdate(id, camposActualizar, {new: true});

        res.json({
            ok:true,
            movimientoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo actualizar el movimiento'
        });        
    }
}

const eliminarMovimiento = async ( req, res = response ) => {
    const id = req.params.id;

    try {
        
        const movimiento = await Movimiento.findById(id);

        if ( !movimiento ){
            return res.status(404).json({
                ok: false,
                msg: 'El movimiento no existe'
            });
        }

        await Movimiento.findByIdAndDelete( id );
        
        res.json({
            ok:true,
            msg: 'Movimiento eliminado '
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo eliminar el movimiento'
        });        
    }
}

module.exports = {
    obtenerMovimientos,
    insertarMovimiento,
    actualizarMovimiento,
    eliminarMovimiento
}