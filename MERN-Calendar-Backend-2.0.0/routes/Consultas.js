/*
    Event Routes
    /api/consultas
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWTConsulta } = require('../middlewares/validar-jwt-Consulta');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getConsultas, crearConsulta, actualizarConsulta, eliminarConsulta } = require('../controllers/consults');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getConsultas );

// Crear una nueva consulta
router.post(
    '/newConsulta',
    [
        check('fecha','Fecha es obligatoria').custom( isDate ),
        check('diagnostico','El diagnostico es obligatorio').not().isEmpty(),
        check('comentario','El comentario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearConsulta 
);

// Actualizar Consulta
router.put(
    '/:id', 
    [
        check('fecha','Fecha es obligatoria').custom( isDate ),
        check('diagnostico','El diagnostico es obligatorio').not().isEmpty(),
        check('comentario','El comentario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarConsulta
);

// Borrar consulta
router.delete('/:id', eliminarConsulta );

module.exports = router;