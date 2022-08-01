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
const { crearInfoDoctores, getInfoDoctores, borrarInfoDoctores, actualizarInfoDoctores } = require('../controllers/infomgmt');

router.use( validarJWT );

/*
    Rutas para controladores de perfil de pacientes.
*/

router.post(
    '/upload_Info_Patient',
    crearInfoPacientes 
);

router.get(
    '/getInfoPatient',
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

/*
    Rutas para controladores de perfil de doctores.
*/

router.post(
    '/upload_Info_Doctor',
    crearInfoDoctores 
);

router.get(
    '/getInfoDoctor',
    getInfoDoctores 
);

router.put(
    '/doctor/:id',
    actualizarInfoDoctores
);

router.delete(
    '/doctor/:id',
    borrarInfoDoctores 
);

module.exports = router;