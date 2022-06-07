/*
    Event Routes
    /api/foto
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearFoto } = require('../controllers/foto');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener fotos 


// Crear un nuevo foto
router.post(
    '/subirFoto',
    [

    ],
    crearFoto 
);


module.exports = router;