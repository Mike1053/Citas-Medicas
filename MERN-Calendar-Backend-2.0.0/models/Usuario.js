const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
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
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    Cedula: {
        type: String,
        required: true,
        unique: true
    },
    Especialidad: {
        type: String,
        required: true  
    }
});

module.exports = model('Usuario', UsuarioSchema );

