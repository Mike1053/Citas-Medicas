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
          msg: 'Ya subiste esta foto, prueba con otra'
      });
  }
}


//obtener fotos por ID
const fotoGet = async(req = request, res = response) => {

    const uid = req.uid;    
  const fotos = await Foto.find({"user":
    uid});
                          


  res.json({
    ok: true,
    fotos
  });
}

const getFotos = async( req, res = response ) => {

    const fotos = await Foto.find()
                                .populate('user','name');
                                

    res.json({
        ok: true,
        fotos
    });
}


const actualizarFoto = async( req, res = response ) => {
 
  const fotoId = req.params.id;
  const uid = req.uid;
  //const uid = req.user;

  try {

      const foto = await Foto.findById( fotoId );

      if ( !foto ) {
          return res.status(404).json({
              ok: false,
              msg: 'Foto no existe por ese id'
          });
      }

      if ( foto.user.toString() !== uid ) {
          return res.status(401).json({
              ok: false,
              msg: 'No tiene privilegio de editar esta foto'
          });
      }

      const nuevaFoto = {
          ...req.body,
          user: uid
      }

      const fotoActualizada = await Foto.findByIdAndUpdate( fotoId, nuevaFoto, { new: true } );

      res.json({
          ok: true,
          evento: fotoActualizada
      });

      
  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}

const eliminarFoto = async( req, res = response ) => {

    const fotoId = req.params.id;
    const uid = req.uid;

    try {

        const foto = await Foto.findById( fotoId );

        if ( !foto ) {
            return res.status(404).json({
                ok: false,
                msg: 'Foto no existe por ese id'
            });
        }

        if ( foto.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar esta foto'
            });
        }


        await Foto.findByIdAndDelete( fotoId );

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
  crearFoto,
  fotoGet,
  actualizarFoto,
  getFotos,
  eliminarFoto

}