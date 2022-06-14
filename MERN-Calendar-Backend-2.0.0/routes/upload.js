/*
    Upload Routes
    /api/upload
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUpload, uploadGet, actualizarUpload, eliminarUpload, getUploads } = require('../controllers/upload');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener uploads por ID
router.get('/', uploadGet );

// Obtener uploads 
router.get('/', getUploads );

// Crear una nueva upload
router.post(
    '/upload',
    [

    ],
    crearUpload 
);

// Actualizar upload
router.put(
  '/:id',
  [
        check('upload','Selecciona una upload').not().isEmpty(),
        validarCampos
  ],
  actualizarUpload
); 

// Eliminar upload
router.delete('/:id', eliminarUpload );

module.exports = router;