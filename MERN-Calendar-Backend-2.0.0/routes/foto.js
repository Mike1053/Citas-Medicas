/*
    Foto Routes
    /api/foto
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearFoto, fotoGet, actualizarFoto, eliminarFoto, getFotos } = require('../controllers/foto');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener fotos por ID
router.get('/', fotoGet );


// Crear una nueva foto
router.post(
    '/subirFoto',
    [

    ],
    crearFoto 
);

// Actualizar foto
router.put(
  '/:id',
  [
        check('foto','Selecciona una foto').not().isEmpty(),
        validarCampos
  ],
  actualizarFoto
); 

// Eliminar foto
router.delete('/:id', eliminarFoto );

module.exports = router;
