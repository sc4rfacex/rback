const mongoose = require('mongoose');
const dbCredentials = process.env.DB_CNN;

//Conexion a la base de datos.
const dbConnection = async() => {

    try {

        await mongoose.connect(dbCredentials, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log(' DB Online ');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}