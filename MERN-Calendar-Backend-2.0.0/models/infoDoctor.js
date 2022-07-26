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
        type: String,
        unique: true
    },
    tarjetas:{
        tarjetaDebito:{
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
        }
    },
    usuarioDoctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});


module.exports = model('perfilDoctor', infoDoctorSchema );