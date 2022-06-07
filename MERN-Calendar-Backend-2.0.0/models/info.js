const { Schema, model } = require('mongoose');

const HistorialSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
});


module.exports = model('Historial', HistorialSchema );