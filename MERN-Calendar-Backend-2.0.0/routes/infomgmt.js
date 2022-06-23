/*
    Ruta
    /api/info
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearInfoPacientes, getInfoPacientes, borrarInfoPacientes, actualizarInfoPacientes } = require('../controllers/infomgmt');

router.use( validarJWT );

router.post(
    '/upload_Info_Patient',
    crearInfoPacientes 
);

router.get(
    '/getInfoID',
    getInfoPacientes 
);

router.put(
    '/:id',
    actualizarInfoPacientes
);

router.delete(
    '/:id',
    borrarInfoPacientes 
);

module.exports = router;