const { response } = require('express');
const Consultorio = require('../models/Consultorio');
const perfilDoctor = require('../models/infoDoctor');
const perfilPaciente = require('../models/infoPaciente');


const getConsultorios = async( req, res = response ) => {

    const consultorios = await Consultorio.find().populate('usuarioDoctor','name');


    res.json({
        ok: true,
        Consultorios_Guardados: consultorios 
    });
}

const crearConsultorio = async ( req, res = response ) => {

    const konsultorio = new Consultorio( req.body );
    const id = req.uid;

    try {
  
        konsultorio.usuarioDoctor = req.uid;
        
        await konsultorio.save();

        let info = await perfilDoctor.findOne({usuarioDoctor: id});
        info.consultorio.push(konsultorio._id.toString());
        
        const infoActualizada = await perfilDoctor.findByIdAndUpdate( info._id, info, { new: true } );

        res.json({
            ok: true,
            Info_de_Doctor: infoActualizada,
            Consultorio_Nuevo: konsultorio
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
    
    const {name, direccion, telefono, numCons, Horario} = req.body;
    const consultorioId = req.params.id;
    const uid = req.uid;

    try {

        const consultorio = await Consultorio.findById( consultorioId );

        if ( !consultorio ) {
            return res.status(404).json({
                ok: false,
                msg: 'La consulta no existe por ese id'
            });
        }

        if ( consultorio.usuarioDoctor.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Este usuario de Medico no tiene privilegio de editar este diagnostico.'
            });
        }

        consultorio.name = name;
        consultorio.telefono = telefono;
        consultorio.numCons = numCons;

        consultorio.direccion.calle = direccion.calle;
        consultorio.direccion.colonia = direccion.colonia;
        consultorio.direccion.numExt = direccion.numExt;
        consultorio.direccion.cp = direccion.cp;
        consultorio.direccion.cd = direccion.cd;
        consultorio.direccion.estado = direccion.estado;
        consultorio.direccion.pais = direccion.pais;

        consultorio.Horario.Lunes.work = Horario.Lunes.work;
        consultorio.Horario.Lunes.start = Horario.Lunes.start;
        consultorio.Horario.Lunes.end = Horario.Lunes.end;

        consultorio.Horario.Martes.work = Horario.Martes.work;
        consultorio.Horario.Martes.start = Horario.Martes.start;
        consultorio.Horario.Martes.end = Horario.Martes.end;

        consultorio.Horario.Miercoles.work = Horario.Miercoles.work;
        consultorio.Horario.Miercoles.start = Horario.Miercoles.start;
        consultorio.Horario.Miercoles.end = Horario.Miercoles.end;

        consultorio.Horario.Jueves.work = Horario.Jueves.work;
        consultorio.Horario.Jueves.start = Horario.Jueves.start;
        consultorio.Horario.Jueves.end = Horario.Jueves.end;

        consultorio.Horario.Viernes.work = Horario.Viernes.work;
        consultorio.Horario.Viernes.start = Horario.Viernes.start;
        consultorio.Horario.Viernes.end = Horario.Viernes.end;

        consultorio.Horario.Sabado.work = Horario.Sabado.work;
        consultorio.Horario.Sabado.start = Horario.Sabado.start;
        consultorio.Horario.Sabado.end = Horario.Sabado.end;

        consultorio.Horario.Domingo.work = Horario.Domingo.work;
        consultorio.Horario.Domingo.start = Horario.Domingo.start;
        consultorio.Horario.Domingo.end = Horario.Domingo.end;

        const consultorioActualizado = await Consultorio.findByIdAndUpdate( consultorioId, consultorio, { new: true } );

        res.json({
            ok: true,
            Consultorio: consultorioActualizado
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

    const konsultorioId = req.params.id;
    const uid = req.uid;

    try {

        const Konsultorio = await Consultorio.findById( konsultorioId );

        if ( !Konsultorio ) {
            return res.status(404).json({
                ok: false,
                msg: 'El consultorio no existe por ese id'
            });
        }

        if ( Konsultorio.usuarioDoctor.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este Consultorio.'
            });
        }

        let profile = await perfilDoctor.findOne({consultorio: { $all : [konsultorioId]}});

        if ( !profile ) {
            return res.status(404).json({
                ok: false,
                msg: 'Este perfil no existe por ese id',
                perfilif: perfil
            });
        }
        
        let indice = await profile.consultorio.findIndex( (element) => element == konsultorioId);
        await profile.consultorio.splice(indice, 1);
        const profileActualizado = await perfilDoctor.findByIdAndUpdate( profile._id, profile, { new: true } );

        await Consultorio.findByIdAndDelete( konsultorioId );

        res.status(200).json({ 
            ok: true,
            msg: 'Se borro la Consulta existosamente.',
            profileActualizado
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