const { response } = require('express');
const Consultorio = require('../models/Consultorio');
const infoDoctor = require('../models/infoDoctor');
const perfilPaciente = require('../models/infoPaciente');


const getConsultorios = async( req, res = response ) => {

    const consultorios = await Consultorio.find().populate('userDoctor','name');


    res.json({
        ok: true,
        Consultorios_Guardadas: consultorios 
    });
}

const crearConsultorio = async ( req, res = response ) => {

    const cons = new Consultorio( req.body );

    try {

        cons.Medico = req.uid;
        
        //const consultaGuardada = await cons.save();
        await cons.save();

        let info = await infoDoctor.findOne({usuarioDoctor: cons.Medico});
        info.Historial.push(cons._id.toString());
        
        const infoActualizada = await infoDoctor.findByIdAndUpdate( info._id, info, { new: true } );
        
        res.json({
            ok: true,
            msg: 'Consultorio guardado exitosamente',
            cons,
            infoActualizada
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo guardar consulta'
        });
    }
}

const actualizarConsultorio = async( req, res = response ) => {
    
    const consultaId = req.params.id;
    const uid = req.uid;

    try {

        const consulta = await Consulta.findById( consultaId );

        if ( !consulta ) {
            return res.status(404).json({
                ok: false,
                msg: 'La consulta no existe por ese id'
            });
        }

        if ( consulta.Medico.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Este usuario de Medico no tiene privilegio de editar este diagnostico.'
            });
        }

        const nuevaConsulta = {
            ...req.body,
            Medico: uid
        }

        const consultaActualizada = await Consulta.findByIdAndUpdate( consultaId, nuevaConsulta, { new: true } );

        res.json({
            ok: true,
            Consulta: consultaActualizada
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarConsultorio = async( req, res = response ) => {

    const consultaId = req.params.id;
    const uid = req.uid;

    try {

        const consulta = await Consulta.findById( consultaId );

        if ( !consulta ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
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
        const perfilActualizado = await perfilPaciente.findByIdAndUpdate( perfil._id, perfil, { new: true } );

        await Consulta.findByIdAndDelete( consultaId );

        res.status(200).json({ 
            ok: true,
            msg: 'Se borro la Consulta existosamente.',
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


module.exports = {
    getConsultorios,
    crearConsultorio,
    actualizarConsultorio,
    eliminarConsultorio
}