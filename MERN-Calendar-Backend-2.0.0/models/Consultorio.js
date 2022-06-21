const { Schema, model } = require('mongoose');

const ConsultorioSchema = Schema({
    direccion: {
        type: String        
    },
    telefono: {
        type: String
    },
    usuarioDoctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});


module.exports = model('Consultorio', ConsultorioSchema );