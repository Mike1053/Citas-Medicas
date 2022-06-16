const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const fileUpload = require('express-fileupload');
// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();



// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Fileupload carga de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/upload/'
}));

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
app.use('/api/foto', require('./routes/foto') );
app.use('/api/uploads', require('./routes/uploads') );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});






