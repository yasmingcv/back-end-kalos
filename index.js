/******
 * Objetivo: API para o projeto TCC
 * Data: 31/08/23
 * Autores: Todos do grupo
 * Versão: 1.0
 ******/

// Import das dependências
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Instanciando o app

const app = express()

//defini as permições do cors
app.use((request, response, next) => {

    //defini quem poderá acessar a  API
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //atribui as permissões as cors
    app.use(cors())

    next()

})
var message = require('./controller/modulo/config.js')
var controllerGenero = require('./controller/controllerGenero.js')


//Define que os dados que irao chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

/******************************************* ENDPOINT GENERO ********************************************/

app.post('/kalos/genero', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let resultadoDadosGenero = await controllerGenero.inserirGenero(dadosBody)

        response.status(resultadoDadosGenero.status)
        response.json(resultadoDadosGenero)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.listen(8080, function(){
    console.log('console rodando')
})