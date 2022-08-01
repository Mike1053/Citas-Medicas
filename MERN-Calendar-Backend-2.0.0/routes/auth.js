/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearPaciente, loginUsuario, revalidarToken, crearDoctor, getPacientes } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get(
    '/getPacientes',
    getPacientes
)


router.post(
    '/newPatient', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearPaciente 
);

router.post(
    '/newDoctor', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        check('license', 'La cedula es obligatoria').not().isEmpty().isNumeric().isLength({ min: 7, max: 8 }),
        check('fullName', 'El nombre completo es obligatorio').not().isEmpty(),
        check('speciality', 'La especialidad es requerida').not().isEmpty(),
        validarCampos
    ],
    crearDoctor
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);


router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;