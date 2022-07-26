const { Schema, model } = require('mongoose');

const infoPacienteSchema = Schema({
    Historial: [{
        type: Schema.Types.ObjectId,
        ref: 'Consulta',        
    }],
    telefono: {
        type: String
    },
    tarjetaCredito:{
        numeroTarjeta:{
            type: Number
        },
        fechaExpiracion:{
            type: Date
        },
        nombreCompleto:{
            type: String
        },
        cvv:{
            type: Number
        }
    },
    usuarioPaciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    }
});


module.exports = model('perfilPaciente', infoPacienteSchema );