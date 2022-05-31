const { response } = require('express');
const bcrypt = require('bcryptjs');
<<<<<<< Updated upstream
const Usuario = require('../models/Usuario');
const Doctor = require('../models/Doctor');
=======
const {UsuarioPaciente, UsuarioMedico} = require('../models/Usuario');
>>>>>>> Stashed changes
const { generarJWT } = require('../helpers/jwt');
 
const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
<<<<<<< Updated upstream
        let usuario = await Usuario.findOne({ email });
=======
        let paciente = await UsuarioPaciente.findOne({ email });
>>>>>>> Stashed changes

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

<<<<<<< Updated upstream
        usuario = new Usuario( req.body );
=======
        paciente = new UsuarioPaciente( req.body );
>>>>>>> Stashed changes
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        paciente.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        // Generar JWT
        const token = await generarJWT( paciente.id, paciente.name );
    
        res.status(201).json({
            ok: true,
            uid: paciente.id,
            name: paciente.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador de Pacientes 1'
        });
    }
}

const crearUsuarioMedico = async(req, res = response ) => {

    const { name, NombreCompleto, Cedula, Especialidad, email, password } = req.body;
/*
    res.json({
        ok: true,
        msg: "Se creo un nuevo usuario de Medico.",
        NombreCompleto,
        name,
        Cedula,
        Especialidad,
        email,
        password
    }) */
    
    try {
        let usuariomed = await UsuarioMedico.findOne({ email });

        if ( usuariomed ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuariomed = new UsuarioMedico( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuariomed.password = bcrypt.hashSync( password, salt );


        await usuariomed.save();

        // Generar JWT
        const token = await generarJWT( usuariomed.id, usuariomed.name );
    
        res.status(201).json({
            ok: true,
            uid: usuariomed.id,
            name: usuariomed.name,
            NombreCompleto: usuariomed.NombreCompleto,
            Cedula: usuariomed.Cedula,
            Especialidad: usuariomed.Especialidad,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador de Medicos'
        });
    }
}

const crearDoctor = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let doctor = await Doctor.findOne({ email });

        if ( doctor ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        doctor = new Doctor( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        doctor.password = bcrypt.hashSync( password, salt );


        await doctor.save();

        // Generar JWT
        const token = await generarJWT( doctor.id, doctor.name );
    
        res.status(201).json({
            ok: true,
            uid: doctor.id,
            name: doctor.name,
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
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    crearDoctor
}