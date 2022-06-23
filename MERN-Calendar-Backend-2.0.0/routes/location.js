/*
    Ruta
    /api/locations
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearConsultorio, getConsultorios, borrarConsultorios, actualizarConsultorios } = require('../controllers/infomgmt');

router.use( validarJWT );

router.post(
    '/uploadLocation',
    crearConsultorio 
);

router.get(
    '/getLocations',
    getConsultorios 
);

router.put(
    '/:id',
    actualizarConsultorios
);

router.delete(
    '/:id',
    borrarConsultorios 
);

module.exports = router;