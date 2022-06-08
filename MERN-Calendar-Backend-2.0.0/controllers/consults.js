const { response } = require('express');
const Consulta = require('../models/Consulta');

const getConsultas = async( req, res = response ) => {

    const consultas = await Consulta.find().populate('userPaciente','name').populate('Medico','name');


    res.json({
        ok: true,
        Consultas_Guardadas: consultas 
    });
}

const crearConsulta = async ( req, res = response ) => {

    const cons = new Consulta( req.body );

    try {

        cons.userPaciente = '62965a5231b4e54d102ed12f';
        cons.Medico = req.uid;
        
        //const consultaGuardada = await cons.save();
        await cons.save();

        res.json({
            ok: true,
            msg: 'Consulta guardada exitosamente',
            cons
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo guardar consulta'
        });
    }
}

const actualizarConsulta = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Consulta.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarConsulta = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getConsultas,
    crearConsulta,
    actualizarConsulta,
    eliminarConsulta
}