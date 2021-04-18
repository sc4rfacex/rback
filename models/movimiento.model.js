const { Schema, model } = require('mongoose');

const MovimientoSchema = Schema ({
    numeroEmpleado: {
        type: Number
    },
    fecha: {
        type: Date,
        required: true,
    },
    cantidadEntregas: {
        type: Number,
        required: true
    },
    cubrioTurno: {
        type: Number,
        required: true,
        default: false
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        require: true
    }

});

MovimientoSchema.method('toJSON', function(){

    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model( 'Movimiento', MovimientoSchema );