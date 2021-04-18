const { response } = require('express');
const Movimiento = require('../models/movimiento.model');
const Nomina = require('../models/nomina.model');
const fs = require('fs');
const PDFDocument = require('../assets/js/pdfkit-tables');

const calcularSueldo = async ( movimientos ) =>{

    const sueldoBase = 240;
    const bonos = {
        chofer: 10,
        cargador: 5
    }

    let sueldoNeto = 0;
    let porcentajeISR = 0;
    let sueldo = 0;
    let valeDespensa = 0;


    console.log('entro a los bonos');

    //Calcular sueldo con bonos por rol y  por entregas.
    movimientos.forEach( (movimiento) => {
        switch( movimiento.empleado.rolEmpleado){
            case 1 || (movimiento.cubrioTurno === 1):
                sueldo += (bonos.chofer * 8) + (movimiento.cantidadEntregas * 5) + sueldoBase;
                break;
            case 2 || movimiento.cubrioTurno:
                sueldo += (bonos.cargador * 8) + (movimiento.cantidadEntregas * 5) + sueldoBase;

                break;
            default:
                console.log("entro auxiliar");
                if( movimiento.cubrioTurno === 1){
                    sueldo += (bonos.chofer * 8) + (movimiento.cantidadEntregas * 5) + sueldoBase;
                    console.log("entro movimiento cubrio turno chofer");
                    break;

                } else if( movimiento.cubrioTurno === 2){
                    sueldo += (bonos.cargador * 8) + (movimiento.cantidadEntregas * 5) + sueldoBase;
                    console.log("entro movimiento cubrio turno cargador");
                    break;

                } else {
                    sueldo += sueldoBase + (movimiento.cantidadEntregas * 5) ;
                    break;
                }
        }
     });

     //Calcular vale de despensa sin contar los impuestos
     if( movimientos[0].empleado.tipoEmpleado === 1 ){
         valeDespensa = sueldo * 0.04;
     } else {
         valeDespensa = 0;
     }

     //Calcular impuesto ISR
     (sueldo < 16000 ) ? porcentajeISR = sueldo * .09 : porcentajeISR = sueldo * .12;

     sueldoNeto = sueldo + valeDespensa - porcentajeISR;

     const resp = {
         sueldo,
         valeDespensa,
         porcentajeISR,
         sueldoNeto
     }
     console.log("sueldo bono - " + resp.sueldo);
     console.log("vale despensa - " + resp.valeDespensa);
     console.log("porcentaje isr - "+ resp.porcentajeISR);
     console.log("sueldo neto - " + resp.sueldoNeto);

     return resp;
}

const generarNomina = async (req, res = response) =>{

    const numeroEmpleado = req.body.numeroEmpleado;
    const fechaInicio = req.body.fechaInicio;
    const fechaFin = req.body.fechaFin;

    var fechaInicial = new Date(fechaInicio);
    var fechaFinal = new Date(fechaFin);

    let fecha = Date.now();


    try {

        const movimientos = await Movimiento.find({ numeroEmpleado,
            fecha: {
                $gte: fechaInicial,
                $lt: fechaFinal
            }
        }).populate( 'empleado', 'nombreEmpleado rolEmpleado tipoEmpleado' );
           
        if( !movimientos ){
            res.status(404).json({
                ok:false,
                msg:'No se encuentran movimientos en ese rango de fechas'
            });
        }
        const {sueldo, valeDespensa, porcentajeISR, sueldoNeto} = await calcularSueldo(movimientos);

        const nomina = new Nomina({
            numeroEmpleado,
            nombreEmpleado : movimientos[0].empleado.nombreEmpleado,
            fecha,
            sueldo,
            valeDespensa,
            porcentajeISR,
            sueldoNeto
        });

        const nominaDB = await nomina.save();

        res.json({
            ok: true,
            nominaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo generar la nomina'
        });
        
    }
}

const obtenerNominas = async ( req, resp = response ) => {

    try {

        const nominas = await Nomina.find();

        if( !nominas ){
            resp.status(404).json({
                ok: false,
                msg:'No hay ninguna nomina registrada'
            });
        }

        resp.status(200).json({
            ok: true,
            nominas
        });

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'Hubo un error al obtener las nominas'
        });
        
    }

}

const obtenerNomina = async ( req, resp = response ) => {

    const numeroEmpleado = req.params.numeroEmpleado;

    try {

        const nomina = await Nomina.find( {numeroEmpleado} );

        if( !nomina ){
            resp.status(404).json({
                ok: false,
                msg:'No hay ninguna nomina registrada con ese empleado'
            });
        }

        resp.status(200).json({
            ok: true,
            nomina
        });

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'Hubo un error al obtener las nominas'
        });
        
    }

}


const eliminarNomina = async ( req, resp = response ) => {

    const id = req.params.id;

    try {

        const nomina = await Nomina.findById( id );

        if( !nomina ){
            resp.status(404).json({
                ok: false,
                msg:'No existe la nomina que desea borrar'
            });
        }

        await Nomina.findByIdAndDelete( id );

        resp.status(200).json({
            ok: true,
            msg:'La nomina se borro correctamente'
        });

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'Hubo un error al obtener las nominas'
        });
        
    }

}

const reporteNomina = async ( req, resp = response ) => {

    const id = req.params.id;
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    try {

        const nominas = await Nomina.findById( id );

        if ( !nominas ){
            res.status(404).json({
                ok:false,
                msg:'No se encuentra la nomina con ese id'
            });
        }

        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(`./assets/reportes/${nominas.numeroEmpleado}-${year}${month}${day}.pdf`));

        doc.image("./assets/img/rinkulogo.png", 50, 45, { width: 120})
            .fillColor("#000000")
            .fontSize(30)
            .text("INFORMACION NOMINA", 180, 80)
            .fontSize(10)
            .text(`Recibi de RINKU la cantidad de $${nominas.sueldoNeto} por concepto de mi sueldo`, 10, 200)
            .text(`Numero de cuenta: xxxxx`, 10, 212)
            .text(`Banco: xxxxx`, 10, 223)
            .moveDown();

        const table = {
            headers: ["Numero de empleado", "Nombre", "Sueldo", "Vale de despensa", "ISR", "Sueldo a pagar"],
            rows: []
        }


        table.rows.push([nominas.numeroEmpleado, 
            nominas.nombreEmpleado, 
            `$${nominas.sueldo}`,
            `+ $${nominas.valeDespensa}`, 
            ` - $${nominas.porcentajeISR}`,
            ` $${nominas.sueldoNeto}`]);

        doc.moveDown().table( table, 15, 250, { width: 590});

        doc.end();

        resp.status(200).json({
            ok: true,
            msg: 'Se genero correctamente el reporte'
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'No se pudo generar el reporte'
        });
        
    }
    
}

// const obtenerPDF = (res, idNomina) {

//     let date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();

//     let rutaArchivo = path.join(`../assets/reportes/${nominas.numeroEmpleado}-${year}${month}${day}.pdf.pdf`);

//     try {
//         if (fs.accessSync(rutaArchivo)) {
//             fs.unlinkSync(rutaArchivo);
//         }
//     } catch (e) {
//         this.generarPDF(res, idNomina);
//     }
// }
    

module.exports = {
    generarNomina,
    obtenerNominas,
    obtenerNomina,
    eliminarNomina,
    reporteNomina
}