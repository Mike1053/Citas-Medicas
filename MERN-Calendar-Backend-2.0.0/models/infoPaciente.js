const { Schema, model } = require('mongoose');

const infoPacienteSchema = Schema({
    Historial: [{
        type: Schema.Types.ObjectId,
        ref: 'Consulta',        
    }],
    telefono: {
        type: String
    },
    usuarioPaciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    }
});


module.exports = model('perfilPaciente', infoPacienteSchema );