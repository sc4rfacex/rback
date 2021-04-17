require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// DB Connection
dbConnection();

//Rutas
app.get('/', (req, res) =>{

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});