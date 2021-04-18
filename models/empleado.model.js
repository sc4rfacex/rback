const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema ({
    numeroEmpleado: {
        type: Number,
        required: true,
        unique: true
    },
    nombreEmpleado: {
        type: String,
        required: true
    },
    rolEmpleado: {
        type: Number,
        required: true
    },
    tipoEmpleado: {
        type: Number,
        required: true
    }

});

EmpleadoSchema.method('toJSON', function(){

    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model( 'Empleado', EmpleadoSchema );