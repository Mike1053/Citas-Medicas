const { response } = require('express');
const perfilPaciente = require('../models/infoPaciente');
const Consulta = require('../models/Consulta')

/*
-----------------------------------------------------------------------------------
Estas primeras 4 funciones se encargan del manejo de los perfiles de pacientes.
----------------------------------------------------------------------------------- 
*/

const getInfoPacientes = async ( req, res = response ) => {

    try {

        //let info = await perfilPaciente.findOne({usuarioPaciente: '62a220ccc052cd437c75b447'});
        let info = await perfilPaciente.find().populate('Historial', 'diagnostico');

        res.json({
            ok: true,
            ID_de_Info_de_Paciente: info
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearInfoPacientes = async ( req, res = response ) => {

    const info = new perfilPaciente( req.body );

    try {

        info.usuarioPaciente = req.uid;
        
        let infoGuardada = await info.save();

        res.json({
            ok: true,
            Info_de_Paciente: infoGuardada
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarInfoPacientes = async ( req, res = response ) => {
    
    const perfilId = req.params.id;
    const uid = req.uid;
    const {telefono} = req.body;

    try {

        const Perfil = await perfilPaciente.findById( perfilId );

        if ( !Perfil ) {
            return res.status(404).json({
                ok: false,
                msg: 'Este perfil no existe por ese id.'
            });
        }

        if ( Perfil.usuarioPaciente.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de actualizar este perfil.'
            });
        }

        Perfil.telefono = telefono;

        const perfilActualizado = await perfilPaciente.findByIdAndUpdate( perfilId, Perfil, { new: true } );

        res.status(200).json({ 
            ok: true,
            msg: 'Se actualizo la informacion del historial existosamente.',
            perfilActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}

const borrarInfoPacientes = async ( req, res = response ) => {

    const consultaId = req.params.id;
    const uid = req.uid;
    //const id = req.body;

    try {

        const consulta = await Consulta.findById( consultaId );

        if ( !consulta ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta consulta no existe por ese id'
            });
        }

        if ( consulta.Medico.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar esta consulta'
            });
        }

        let perfil = await perfilPaciente.findOne({Historial: { $all : [consultaId]}});

        if ( !perfil ) {
            return res.status(404).json({
                ok: false,
                msg: 'Este perfil no existe por ese id',
                perfilif: perfil
            });
        }
        
        let indice = await perfil.Historial.findIndex( (element) => element == consultaId);
        await perfil.Historial.splice(indice, 1);
        const perfilActualizado = await perfilPaciente.findByIdAndUpdate( id, perfil, { new: true } );

        res.status(200).json({ 
            ok: true,
            msg: 'Se borro la consulta del historial existosamente.',
            perfilActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

/*
-----------------------------------------------------------------------------------
Estas segundas 4 funciones se encargan del manejo de los perfiles de Doctores.
----------------------------------------------------------------------------------- 
*/

module.exports = {
    crearInfoPacientes,
    getInfoPacientes,
    actualizarInfoPacientes,
    borrarInfoPacientes
}