const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const Archivo = require('../models/Archivo');


const cargarArchivo = async(req, res = response) => {


    try {
        
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const actualizarImagen = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Archivo.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();


    res.json( modelo );

}


const actualizarImagenCloudinary = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Archivo.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }


    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    await modelo.save();


    res.json( modelo );

}

const mostrarImagen = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Archivo.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}




module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}


/* const { response } = require('express');
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

} */