const { response } = require('express');
const Upload = require('../models/Upload');

const crearUpload = async ( req, res = response ) => {

  const upload = new Upload( req.body );

  try {

      upload.user = req.uid;
      
      const uploadGuardada = await upload.save();

      res.json({
          ok: true,
          evento: uploadGuardada
      })


  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Ya subiste este arcivo, prueba con otro'
      });
  }
}


//obtener upload por ID
const uploadGet = async(req = request, res = response) => {

    const uid = req.uid;    
  const uploads = await Upload.find({"user":
    uid});
                          


  res.json({
    ok: true,
    uploads
  });
}

const getUploads = async( req, res = response ) => {

    const uploads = await Upload.find()
                                .populate('user','name');
                                

    res.json({
        ok: true,
        uploads
    });
}


const actualizarUpload = async( req, res = response ) => {
 
  const uploadId = req.params.id;
  const uid = req.uid;
  //const uid = req.user;

  try {

      const upload = await Upload.findById( uploadId );

      if ( !upload ) {
          return res.status(404).json({
              ok: false,
              msg: 'archivo no existe por ese id'
          });
      }

      if ( upload.user.toString() !== uid ) {
          return res.status(401).json({
              ok: false,
              msg: 'No tiene privilegio de editar este archivo'
          });
      }

      const nuevaUpload = {
          ...req.body,
          user: uid
      }

      const uploadActualizada = await Upload.findByIdAndUpdate( uploadId, nuevaUpload, { new: true } );

      res.json({
          ok: true,
          evento: uploadActualizada
      });

      
  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}

const eliminarUpload = async( req, res = response ) => {

    const uploadId = req.params.id;
    const uid = req.uid;

    try {

        const upload = await Upload.findById( uploadId );

        if ( !foto ) {
            return res.status(404).json({
                ok: false,
                msg: 'Upload no existe por ese id'
            });
        }

        if ( foto.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este archivo'
            });
        }


        await Upload.findByIdAndDelete( uploadId );

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
  crearUpload,
  uploadGet,
  actualizarUpload,
  getUploads,
  eliminarUpload

}