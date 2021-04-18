const { response } = require('express');
const { validarCampos } = require('../middleware/validar-campos');

const Empleado = require('../models/empleado.model');

const obtenerEmpleados = async (req, res) =>{
    
    const empleados = await Empleado.find();

    res.json({
        ok: true,
        empleados
    });
}   

const insertarEmpleado = async (req, res = response ) =>{

    const {numeroEmpleado} = req.body;

    try {

        const existeEmpleado = await Empleado.findOne( {numeroEmpleado});
        console.log(existeEmpleado);
        if( existeEmpleado ){
            return res.status(400).json({
                ok:false,
                msg:'El empleado ya esta registrado'
            })
        }

        const empleado = new Empleado ( req.body );
    
        await empleado.save();
    
        res.status(201).json({
            ok: true,
            empleado
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar el empleado'
        })
        
    }
    
}  

const actualizarEmpleado = async( req, res = response) => {

    const pNumeroEmpleado = req.params.numeroEmpleado;
    const {numeroEmpleado, ...empleadoActualizar} = req.body;

    try {

        const empleadoDB = await Empleado.findOne({numeroEmpleado: pNumeroEmpleado} );

        if( !empleadoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese numero de empleado'
            });
        }

        if( empleadoDB.numeroEmpleado !== numeroEmpleado) {
            const existeNumeroEmpleado = await Empleado.findOne({numeroEmpleado});
            if( existeNumeroEmpleado ){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un empleado con ese numero de empleado'
                });
            }
        }

        empleadoActualizar.numeroEmpleado = numeroEmpleado;
        // Actualizacion
        const empleadoActualizado = await Empleado
        .findOneAndUpdate({numeroEmpleado:pNumeroEmpleado}, empleadoActualizar, {new: true});  
        
        res.status(200).json({
            ok: true,
            empleadoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo actualizar el empleado'
        })
        
    }
}

const borrarEmpleado = async ( req, res = response) => {

    const numeroEmpleado = req.params.numeroEmpleado;

    try {
        const empleadoDB = await Empleado.findOne({numeroEmpleado} );

        if( !empleadoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese numero de empleado'
            });
        }

        await Empleado.findOneAndDelete({numeroEmpleado});

        res.status(201).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el empleado'
        });
    }

}

module.exports = {
    obtenerEmpleados,
    insertarEmpleado,
    actualizarEmpleado,
    borrarEmpleado
}