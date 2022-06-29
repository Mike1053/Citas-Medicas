const { response } = require('express');
const Task = require('../models/Task');

const getTask = async( req, res = response ) => {

    const uid = req.uid;

    const task = await Task.find({"user":
    uid});

    res.json({
        ok: true,
        task
    });
}

const crearTask = async ( req, res = response ) => {

    const task = new Task( req.body );

    try {

        task.user = req.uid;
        
        const taskGuardado = await task.save();

        res.json({
            ok: true,
            task: taskGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarTask = async( req, res = response ) => {
    
    const taskId = req.params.id;
    const uid = req.uid;

    try {

        const task = await Task.findById( taskId );

        if ( !task ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no existe por ese id'
            });
        }

        if ( task.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta tarea'
            });
        }

        const nuevoTask = {
            ...req.body,
            user: uid
        }

        const taskActualizado = await Task.findByIdAndUpdate( taskId, nuevoTask, { new: true } );

        res.json({
            ok: true,
            task: taskActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarTask = async( req, res = response ) => {

    const taskId = req.params.id;
    const uid = req.uid;

    try {

        const task = await Task.findById( taskId );

        if ( !task ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no existe por ese id'
            });
        }

        if ( task.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar esta tarea'
            });
        }


        await Task.findByIdAndDelete( taskId );

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
    getTask,
    crearTask,
    actualizarTask,
    eliminarTask
}