const { response } = require('express');
const Foto = require('../models/Foto');

const crearFoto = async ( req, res = response ) => {

  const foto = new Foto( req.body );

  try {

      foto.user = req.uid;
      
      const fotoGuardada = await foto.save();

      res.json({
          ok: true,
          evento: fotoGuardada
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
  crearFoto
}