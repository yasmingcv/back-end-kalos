/******
 * Objetivo: EndPoints para o projeto TCC
 * Data: 31/08/23 - ??/??/??
 * Autores: Todos os integrantes do grupo
 * Versão: 1.0
 ******/

// Import das dependências
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Instanciando o app

const app = express()

//const passport = require('passport')

//define as permições do cors
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
var controllerTag = require('./controller/controllerTag.js')
var controllerFuncionamento = require('./controller/controllerFuncionamento.js')


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

//app.post('/kalos/esqueci_senha/academia', bodyParserJSON, cors(), async function(request, response){
 //   const body = request.body
//
 //   const resposta = await controllerAcademia.esqueciASenha(body)

   // response.json(resposta)
  //  response.status(resposta.status)
//})

app.get('/kalos/academia', cors(), async function (request, response){
    let dadosAcademias = await controllerAcademia.getAcademias()

    response.json(dadosAcademias)
    response.status(dadosAcademias.status)
})

// Retorna a academia pelo id
app.get('/kalos/academia/id/:id', cors(), async function(request, response){

    let idAcademia = request.params.id

    let dadosAcademia = await controllerAcademia.getAcademiaById(idAcademia)

    response.status(dadosAcademia.status)
    response.json(dadosAcademia)

})

// retorna uma academia pelo EMAIL
app.get('/kalos/academia/email/:email', cors(), async function(request, response){

    let emailAcademia = request.params.email

    let dadosAcademia = await controllerAcademia.getAcademiaByEmail(emailAcademia)

    response.status(dadosAcademia.status)
    response.json(dadosAcademia)

})

// Retorna a academia pelo nome
app.get('/kalos/academia/nome/:nome', cors(), async function(request, response){

    let nomeAcademia = request.params.nome

    let dadosAcademia = await controllerAcademia.getAcademiaByName(nomeAcademia)

    response.status(dadosAcademia.status)
    response.json(dadosAcademia)
})
// Insere uma nova academia
app.post('/kalos/academia', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body
        console.log(dadosBody);
        let resultadoDadosAcademia = await controllerAcademia.inserirAcademia(dadosBody)

        response.status(resultadoDadosAcademia.status)
        response.json(resultadoDadosAcademia)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

// Atualiza os dados de uma academia
app.put('/kalos/academia/id/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let idAcademia = request.params.id

        let dadosAcademia = await controllerAcademia.atualizarAcademia(dadosBody, idAcademia)

        response.status(dadosAcademia.status)
        response.json(dadosAcademia)
    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

// Deleta uma academia
app.delete('/kalos/academia/id/:id', cors(), async function(request, response){

    let idAcademia = request.params.id

    let dadosAcademia = await controllerAcademia.deletarAcademia(idAcademia)

    response.status(dadosAcademia.status)
    response.json(dadosAcademia)
    
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

// retorna um aluno pelo EMAIL
app.get('/kalos/aluno/email/:email', cors(), async function(request, response){

    let emailAluno = request.params.email

    let dadosAluno = await controllerAluno.getAlunoByEmail(emailAluno)

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

    console.log('autenticar');
    let contentType = request.headers['content-type']
    
    if(String(contentType).toLowerCase() == 'application/json'){
        let dadosBody = request.body
        let resultDadosAluno = await controllerAluno.autenticarAluno(dadosBody)

        response.status(200)
        response.json(resultDadosAluno)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})


/******************************************* ENDPOINTs TAGs ********************************************/

//Retorna todas as tags existentes
app.get('/kalos/tags', cors(), async function (request, response){
    let dadosTags = await controllerTag.getTags()

    response.json(dadosTags)
    response.status(dadosTags.status)
})

/******************************************* ENDPOINTs TREINOS ********************************************/

app.get('/kalos/treino', cors(), async function(request, response){
    let dadosTreino = await controllerTreino.getTreinos()

    response.json(dadosTreino)
    response.status(dadosTreino.status)
})

app.get('/kalos/treino/id/:id', cors(), async function(request, response){

    let idTreino = request.params.id

    let dadosTreino = await controllerTreino.getTreinoByID(idTreino)

    response.status(dadosTreino.status)
    response.json(dadosTreino)
})

app.post('/kalos/treino', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let resultadoDadosTreino = await controllerTreino.inserirTreino(dadosBody)

    response.status(resultadoDadosTreino.status)
    response.json(resultadoDadosTreino)

})

app.put('/kalos/treino/id/:id', cors(), bodyParserJSON, async function(request, response){
    
    let dadosBody = request.body

    let idTreino = request.params.id

    let resultadoDadosTreino = await controllerTreino.atualizarTreino(dadosBody, idTreino)

    response.status(resultadoDadosTreino.status)
    response.json(resultadoDadosTreino)
})

app.delete('/kalos/treino/id/:id', cors(), async function(request, response){

    let idTreino = request.params.id

    let dadosTreino = await controllerTreino.deletarTreino(idTreino)

    response.status(dadosTreino.status)
    response.json(dadosTreino)
})

/******************************************* ENDPOINTs FUNCIONAMENTO ********************************************/

app.post('/kalos/funcionamento', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber em dados JSON
    if(String(contentType).toLowerCase() == 'application/json'){
        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultDadosFuncionamento = await controllerFuncionamento.insertFuncionamento(dadosBody)

        response.status(resultDadosFuncionamento.status)
        response.json(resultDadosFuncionamento)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

app.put('/kalos/funcionamento/id_academia/:id', cors(), bodyParserJSON, async function(request, response){
    let id = request.params.id
    let contentType = request.headers['content-type']

    //Validação para receber em dados JSON
    if(String(contentType).toLowerCase() == 'application/json'){
        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultDadosFuncionamento = await controllerFuncionamento.updateFuncionamento(dadosBody, id)

        response.status(resultDadosFuncionamento.status)
        response.json(resultDadosFuncionamento)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

app.delete('/kalos/funcionamento/id_academia/:id', cors(), async function(request, response){

    //recebe o ID do aluno pelo parametro
    let idAcademia = request.params.id

    let dadosFuncionamento = await controllerFuncionamento.deletarFuncionamento(idAcademia)

    response.status(dadosFuncionamento.status)
    response.json(dadosFuncionamento)
})

app.get('/kalos/funcionamento', cors(), async function(request, response){
    let dadosFuncionamentos = await controllerFuncionamento.getFuncionamentos()

    response.json(dadosFuncionamentos)
    response.status(dadosFuncionamentos.status)
})

app.get('/kalos/funcionamento/id_academia/:id', cors(), async function(request, response){

    let id = request.params.id

    let dadosFuncionamento = await controllerFuncionamento.getFuncionamentoByIdAcademia(id)

    response.status(dadosFuncionamento.status)
    response.json(dadosFuncionamento)
})

/******************************************* ENDPOINTs CATEGORIA TREINO ********************************************/

app.get('/kalos/categoriaTreino', cors(), async function(request, response){

    let dadosCategoriaTreino = await controllerCategoriaTreino.getCategoriasTreino()

    response.status(dadosCategoriaTreino.status)
    response.json(dadosCategoriaTreino)
})

app.get('/kalos/categoriaTreino/id/:id', cors(), async function(request, response){

    let idCategoriaTreino = request.params.id

    let dadosCategoriaTreino = await controllerCategoriaTreino.getCategoriaTreinoByID(idCategoriaTreino)

    response.status(dadosCategoriaTreino.status)
    response.json(dadosCategoriaTreino)

})

app.post('/kalos/categoriaTreino', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let resultadoDadosCategoria = await controllerCategoriaTreino.inserirCategoriaTreino(dadosBody)

    response.status(resultadoDadosCategoria.status)
    response.json(resultadoDadosCategoria)
})

app.put('/kalos/categoriaTreino/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idCategoriaTreino = request.params.id

    let resultadoDadosCategoria = await controllerCategoriaTreino.atualizarCategoriaTreino(dadosBody, idCategoriaTreino)

    response.status(resultadoDadosCategoria.status)
    response.json(resultadoDadosCategoria)
})

app.delete('/kalos/categoriaTreino/id/:id', cors(), async function(request, response){

    let idCategoriaTreino = request.params.id

    let resultadoDadosCategoria = await controllerCategoriaTreino.deletarCategoriaTreino(idCategoriaTreino)

    response.status(resultadoDadosCategoria.status)
    response.json(resultadoDadosCategoria)
})









app.listen(8080, function(){
    console.log('console rodando')
})