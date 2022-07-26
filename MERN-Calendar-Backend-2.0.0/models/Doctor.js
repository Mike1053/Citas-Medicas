const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    speciality: {
        type: String,
        required: true
    },
    direccion: {
        calle:{
            type: String
        },
        colonia:{
            type: String
        },
        numExt:{
            type: Number
        },
        cp:{
            type: Number 
        },
        cd:{
            type:String
        },
        estado:{
            type: String
        },
        pais:{
            type: String
        },
        latitud:{
            type: String
        },
        longitud: {
            type: String
        }
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


module.exports = model('Doctor', DoctorSchema );

