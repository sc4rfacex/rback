require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

// DB Connection
dbConnection();

//Rutas
app.use( '/api/empleados', require('./routes/empleados.routes') );
app.use( '/api/movimientos', require('./routes/movimientos.routes') );




app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});