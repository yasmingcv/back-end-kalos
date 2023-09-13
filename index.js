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

//const passport = require('passport')

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
var controllerAcademia = require('./controller/controllerAcademia.js')
var controllerAluno = require('./controller/controllerAluno.js')


//Define que os dados que irao chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

/******************************************* ENDPOINTs GENERO ********************************************/

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

app.put('/kalos/genero/id/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let idGenero = request.params.id

        let resultadoDadosGenero = await controllerGenero.atualizarGenero(dadosBody, idGenero)

        response.status(resultadoDadosGenero.status)
        response.json(resultadoDadosGenero)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.message(message.ERROR_INVALID_CONTENT_TYPE.message)

    }
})

app.delete('/kalos/genero/id/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.deletarGenero(idGenero)

    response.status(dadosGenero.status)
    response.json(dadosGenero)
})


/******************************************* ENDPOINTs ACADEMIA ********************************************/

const verifyJWTAcademia = async function (request, response, next) {
    let token = request.headers['x-access-token']

    const jwt = require('./middleware/jwtAcademia.js')

    const autenticidadeToken = await jwt.validateJWT(token)

    if(autenticidadeToken){
        next()
    } else{
        return response.status(401).end()
    }
}

const verifyJWTAluno = async function (request, response, next) {
    let token = request.headers['x-access-token']

    const jwt = require('./middleware/jwtAluno.js')

    const autenticidadeToken = await jwt.validateJWT(token)

    if(autenticidadeToken){
        next()
    } else{
        return response.status(401).end()

    }
}

app.get('/kalos/academia', cors(), async function (request, response){
    let dadosAcademias = await controllerAcademia.getAcademias()

    response.json(dadosAcademias)
    response.status(dadosAcademias.status)
})

app.post('/kalos/academia/autenticar', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    if(String(contentType).toLowerCase() == 'application/json'){
        let dadosBody = request.body
        let resultDadosAcademia = await controllerAcademia.autenticarAcademia(dadosBody)

        response.status(200)
        response.json(resultDadosAcademia)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.message(message.ERROR_INVALID_CONTENT_TYPE.message)

    }

})

/******************************************* ENDPOINTs ALUNO ********************************************/

// retorna todos os alunos existentes
app.get('/kalos/aluno', cors(), async function (request, response){
    let dadosAlunos = await controllerAluno.getAlunos()

    response.json(dadosAlunos)
    response.status(dadosAlunos.status)
})

// retorna um aluno pelo ID
app.get('/kalos/aluno/id/:id', cors(), async function(request, response){

    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getAlunoById(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
})

// retorna um aluno pelo NOME
app.get('/kalos/aluno/nome/:nome', cors(), async function(request, response){

    let nomeAluno = request.params.nome

    let dadosAluno = await controllerAluno.getAlunoByName(nomeAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
})

// insere um novo aluno
app.post('/kalos/aluno', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber em dados JSON
    if(String(contentType).toLowerCase() == 'application/json'){

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)
    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)

    }

})

// atualiza um alno existente
app.put('/kalos/aluno/id/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        //recebe o ID  do aluno pelo parametro
        let idAluno = request.params.id

        let resultadoDadosAluno = await controllerAluno.atualizarAluno(dadosBody, idAluno)

        response.status(resultadoDadosAluno.status)
        response.json(resultadoDadosAluno)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)

    }
})

// deleta um aluno existente
app.delete('/kalos/aluno/id/:id', cors(), async function(request, response){

    //recebe o ID do aluno pelo parametro
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.deletarAluno(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
})

app.post('/kalos/aluno/autenticar', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    if(String(contentType).toLowerCase() == 'application/json'){
        let dadosBody = request.body
        let resultDadosAluno = await controllerAluno.autenticarAluno(dadosBody)

        response.status(200)
        response.json(resultDadosAluno)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.message(message.ERROR_INVALID_CONTENT_TYPE.message)

    }

})

app.listen(8080, function(){
    console.log('console rodando')
})