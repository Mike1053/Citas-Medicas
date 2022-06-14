const { response } = require('express');
const Consulta = require('../models/Consulta');
const perfilPaciente = require('../models/infoPaciente');


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

        cons.userPaciente = '62a220ccc052cd437c75b447';
        cons.Medico = req.uid;
        
        //const consultaGuardada = await cons.save();
        await cons.save();

        let info = await perfilPaciente.findOneAndUpdate({usuarioPaciente: '62a220ccc052cd437c75b447'});
        //info.Historial.push(cons._id);
        /*
        perfilPaciente.updateOne(
            { _id: ID }, 
            { $push: { 
                      Historial: cons.ObjectI    
                    } 
            })
*/
        res.json({
            ok: true,
            msg: 'Consulta guardada exitosamente',
            cons,
            info
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
    
    const consultaId = req.params.id;
    const uid = req.uid;

    try {

        const consulta = await Consulta.findById( eventoId );

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