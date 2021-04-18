const { Schema, model } = require('mongoose');

const NominaSchema = Schema ({
    numeroEmpleado: {
        type: Number,
        required: true
    },
    nombreEmpleado: {
        type: String,
        required: true
    },
    sueldo: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true,
    },
    valeDespensa: {
        type: Number,
        required: true,
        default: false
    },
    porcentajeISR: {
        type: Number,
        ref: 'Empleado',
        require: true
    },
    sueldoNeto: {
        type: Number,
        ref: 'Empleado',
        require: true
    }

});

NominaSchema.method('toJSON', function(){

    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model( 'Nomina', NominaSchema );