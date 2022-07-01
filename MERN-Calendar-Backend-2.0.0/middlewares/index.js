const validarArchivo = require('../middlewares/validar-archivos');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');


module.exports = {
  ...validarArchivo,
  ...validarCampos,
  ...validarJWT
}