const { response } = require('express');
const perfilPaciente = require('../models/infoPaciente');

/*
const actHistorial = async(req, res = response ) => {
    try {
        await ListItem.findByIdAndUpdate(req.params.id, {
            itemname: req.body.itemname,
            category: req.body.category
        });
        // Send response in here
        res.send('Item Updated!');
  
      } catch(err) {
          console.error(err.message);
          res.send(400).send('Server Error');
      }
}
*/

const getInfo = async ( req, res = response ) => {

    try {

        let info = await perfilPaciente.findOne({usuarioPaciente: '62a220ccc052cd437c75b447'});

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

const crearInfo = async ( req, res = response ) => {

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

module.exports = {
    crearInfo,
    getInfo
}