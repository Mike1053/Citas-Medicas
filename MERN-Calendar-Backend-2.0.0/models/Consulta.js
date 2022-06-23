const { Schema, model } = require('mongoose');


const ConsultaSchema = Schema({
    fecha: {
        type: Date,
        required: true   
    },
    diagnostico: {
        type: String
    },
    comentario: {
        type: String
    },
    userPaciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    Medico: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});


module.exports = model('Consulta', ConsultaSchema );