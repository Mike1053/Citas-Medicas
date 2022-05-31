const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Doctor = require('../models/Doctor');
const {UsuarioPaciente, UsuarioMedico} = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
 
const crearUsuario = async(req, res = response ) => {

    const { name, email, password } = req.body;

    try {
        let correo = await Usuario.findOne({ email });
        let nombre = await Usuario.findOne({ name });

        if ( correo ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo de usuario ya existe'
            });
        }

        if ( nombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
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




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    crearDoctor
}