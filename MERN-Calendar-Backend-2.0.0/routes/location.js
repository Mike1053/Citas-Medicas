/*
    Ruta
    /api/locations
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearConsultorio, getConsultorios, eliminarConsultorio, actualizarConsultorio } = require('../controllers/locationsControl');

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
    actualizarConsultorio
);

router.delete(
    '/:id',
    eliminarConsultorio 
);

module.exports = router;