/*
    Ruta
    /api/info
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearInfo } = require('../controllers/infomgmt');

router.use( validarJWT );

router.post(
    '/upload_Info_Patient',
    crearInfo 
);

module.exports = router;