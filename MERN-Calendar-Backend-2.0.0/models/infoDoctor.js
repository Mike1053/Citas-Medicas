const { Schema, model } = require('mongoose');

const infoDoctorSchema = Schema({
    prefijo:{
        type: String
    },
    consultorio: [{
        type: Schema.Types.ObjectId,
        ref: 'Consultorio',        
    }],
    telefono: {
        type: String
    },
    usuarioDoctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});


module.exports = model('perfilDoctor', infoDoctorSchema );