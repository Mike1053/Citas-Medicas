const { response } = require('express');
const bcrypt = require('bcryptjs');
const Paciente = require('../models/Paciente');
const Doctor = require('../models/Doctor');
const { generarJWT } = require('../helpers/jwt');       

const getPacientes = async(req, res = response) => {

    const Pacientes = await Paciente.find();

    res.json({
        ok: true,
        Pacientes_Guardados: Pacientes 
    });
}



const crearPaciente = async(req, res = response ) => {

    const { name, email, password } = req.body;

    try {
        
        let correoPaciente = await Paciente.findOne({ email });
        let nombrePaciente = await Paciente.findOne({ name });
        let correoDoctor = await Doctor.findOne({ email });
        let nombreDoctor = await Doctor.findOne({ name });

        if ( correoPaciente ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo de usuario de Paciente ya existe'
            });
        }

        if ( nombrePaciente ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario de Paciente ya existe'
            });
        }

        if ( correoDoctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo de usuario de Doctor ya existe'
            });
        }

        if ( nombreDoctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario de Doctor ya existe'
            });
        }

        let usuario = new Paciente( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name, usuario.email, usuario.license, usuario.fullName, usuario.speciality );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            license: usuario.license,
            fullName: usuario.fullName,
            speciality: usuario.speciality,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const crearDoctor = async(req, res = response ) => {

    const { name, email, password } = req.body;

    try {

        let correoPaciente = await Paciente.findOne({ email });
        let nombrePaciente = await Paciente.findOne({ name });
        let correoDoctor = await Doctor.findOne({ email });
        let nombreDoctor = await Doctor.findOne({ name });

        if ( correoPaciente ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo de usuario de Paciente ya existe'
            });
        }

        if ( nombrePaciente ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario de Paciente ya existe'
            });
        }

        if ( correoDoctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo de usuario de Doctor ya existe'
            });
        }

        if ( nombreDoctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario de Doctor ya existe'
            });
        }


        let doctor = new Doctor( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        doctor.password = bcrypt.hashSync( password, salt );


        await doctor.save();

        // Generar JWT
        const token = await generarJWT( doctor.id, doctor.name, doctor.email, doctor.license, doctor.fullName, doctor.speciality );
    
        res.status(201).json({
            ok: true,
            uid: doctor.id,
            name: doctor.name,
            email: doctor.email,
            license: doctor.license,
            fullName: doctor.fullName,
            speciality: doctor.speciality,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioPaciente = await Paciente.findOne({ email });
        const usuarioDoctor = await Doctor.findOne({ email });

        if ( usuarioPaciente ) {
            
            // Confirmar los passwords
            const validPassword = bcrypt.compareSync( password, usuarioPaciente.password );

            if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto'
                });
            }

            // Generar JWT
            const token = await generarJWT( usuarioPaciente.id, usuarioPaciente.name, usuarioPaciente.email, usuarioPaciente.license, usuarioPaciente.fullName, usuarioPaciente.speciality );

            res.json({
                ok: true,
                uid: usuarioPaciente.id,
                name: usuarioPaciente.name,
                email: usuarioPaciente.email,
                license: usuarioPaciente.license,
                fullName: usuarioPaciente.fullName,
                speciality: usuarioPaciente.speciality,
                token
            })
        }

        if ( usuarioDoctor ) {
            
            // Confirmar los passwords
            const validPassword = bcrypt.compareSync( password, usuarioDoctor.password );

            if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto'
                });
            }

            // Generar JWT
            const token = await generarJWT( usuarioDoctor.id, usuarioDoctor.name, usuarioDoctor.email, usuarioDoctor.license, usuarioDoctor.fullName, usuarioDoctor.speciality );

            res.json({
                ok: true,
                uid: usuarioDoctor.id,
                name: usuarioDoctor.name,
                email: usuarioDoctor.email,
                license: usuarioDoctor.license,
                fullName: usuarioDoctor.fullName,
                speciality: usuarioDoctor.speciality,
                token
            })
        }

        if ( !usuarioPaciente && !usuarioDoctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response ) => {

    const { uid, name, email } = req;

    // Generar JWT
    const token = await generarJWT( uid, name, email );

    res.json({
        ok: true,
        uid,
        name,
        email,
        token
    })
}




module.exports = {
    crearPaciente,
    loginUsuario,
    revalidarToken,
    crearDoctor,
    getPacientes
}