/*
    Event Routes
    /api/foto
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearFoto, fotoGet, actualizarFoto } = require('../controllers/foto');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener fotos 
router.get('/', fotoGet );

// Crear un nuevo foto
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

// Borrar foto
router.delete(
  '/borrarFoto',
  [
    
  ]
)

module.exports = router;