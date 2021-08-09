const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
var url = 'https://script.google.com/macros/s/AKfycbx8077h-mPuBfdOjT_-QoZ03pe87pcePvpcP8fe29Atd8AERHWTB3DyKX4VymzKokmFpA/exec'


//--Entrego el camino de la database--/
//--Defino desde la creación de una nueva entrada el ID y el contenido -/
admin.initializeApp();

exports.envio_evaluacion = functions.database.ref('/registers/{pushId}')
    .onCreate((snapshot, context) => {

    var registro = JSON.stringify({"eval": snapshot})
    console.log('mi array es: '+ registro)
    axios
    .post(url, registro,{headers:{"Content-Type" : "application/json"}})
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log("todo ok con el envío") //console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
    return "null"
    });

    //usar firebase deploy --only "functions:envio_evaluacion"