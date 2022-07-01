const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const fileUpload = require('express-fileupload');
// Crear el servidor de express
const app = express();
const server = require("http").createServer(app);

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
app.use('/api/task', require('./routes/task') );
app.use('/api/consultas', require('./routes/Consultas') );
app.use('/api/info', require('./routes/infomgmt') );
app.use('/api/locations', require('./routes/location') );

//Backend de videollamada------------------------
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  app.use(cors());
  
  const PORT = process.env.PORT || 5000;
  
  app.get("/", (req, res) => {
    res.send("Running");
  });
  
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);
  
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", {
        signal: signalData,
        from,
        name,
      });
    });
  
    socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
      console.log("updateMyMedia");
      socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
    });
  
    socket.on("msgUser", ({ name, to, msg, sender }) => {
      io.to(to).emit("msgRcv", { name, msg, sender });
    });
  
    socket.on("answerCall", (data) => {
      socket.broadcast.emit("updateUserMedia", {
        type: data.type,
        currentMediaStatus: data.myMediaStatus,
      });
      io.to(data.to).emit("callAccepted", data);
    });
    socket.on("endCall", ({ id }) => {
      io.to(id).emit("endCall");
    });
  });
//Backend de videollamada------------------------
app.use('/api/uploads', require('./routes/uploads') );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});






