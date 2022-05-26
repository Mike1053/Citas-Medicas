const { Schema, model } = require('mongoose');

const UsuarioPacienteSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UsuarioMedicoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    NombreCompleto: {
        type: String,
        required: true
    },
    Cedula: {
        type: String,
        required: true,
        unique: true
    },
    Especialidad: {
        type: String,
        required: true  //8 digitos 11785737
    }
});

module.exports = model('UsuarioPaciente', UsuarioPacienteSchema );
module.exports = model('UsuarioMedico', UsuarioMedicoSchema );

