const { Router } = require('express');
const router = Router();
const { subirImagen } = require('../controllers/infomgmt');



router.put(
    '/uploadHist', 
    subirHistorial 
);