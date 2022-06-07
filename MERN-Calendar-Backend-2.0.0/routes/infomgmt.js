const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { subirImagen } = require('../controllers/infomgmt');



router.put(
    '/uploadHist',
    validarJWT,
    actHistorial 
);