const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema ({
    numeroEmpleado: {
        type: Number,
        required: true 
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