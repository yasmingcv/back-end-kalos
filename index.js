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
var funcoesNodemailerAcademia = require('./nodemailer2.0/funcoes/academia.js')
var funcoesNodemailerAluno = require('./nodemailer2.0/funcoes/aluno.js')
var controllerTreino = require('./controller/controllerTreino.js')
var controllerAlunoAcademia = require('./controller/controllerAlunoAcademia.js')
var controllerExercicio = require('./controller/controllerExercicio.js')
var controllerCategoriaTreino = require('./controller/controllerCategoriaTreino.js')
var controllerNivel = require('./controller/controllerNivel.js')
var controllerRepeticao = require('./controller/controllerRepeticao.js')
var controllerSerie = require('./controller/controllerSerie.js')
var controllerTreinoNivelCategoria = require('./controller/controllerTreinoNivelCategoria.js')
var controllerExercicioSerieRepeticao = require('./controller/controllerExercicioSerieRepeticao.js')
var controllerAlunoTreino = require('./controller/controllerAlunoTreino.js')
var controllerCategoria = require('./controller/controllerCategoria.js')
var controllerPostagem = require('./controller/controllerPostagem.js')
var controllerCarga = require('./controller/controllerCarga.js')
var controllerCategoriaProduto = require('./controller/controllerCategoriaProduto.js')
var controllerProduto = require('./controller/controllerProduto.js')
var controllerFotos = require('./controller/controllerFotos.js')
var controllerReserva = require('./controller/controllerReserva.js')


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

// Envia o e-mail com código de redefinição de senha
app.post('/kalos/academia/esqueci_senha', bodyParserJSON, cors(), async function(request, response){
   const body = request.body

   var resposta = await funcoesNodemailerAcademia.esqueciASenha(body)

   response.json(resposta)
   response.status(resposta.status)
})

// Valida o código de recuperação do usuário (que foi enviado)
app.post('/kalos/academia/validar_token', bodyParserJSON, cors(), async function(request, response){
    const body = request.body

    var rsAcademia = await funcoesNodemailerAcademia.verificarToken(body)

    response.json(rsAcademia)
    response.status(rsAcademia.status)
})

// Atualiza a senha
app.put('/kalos/academia/redefinir_senha', bodyParserJSON, cors(), async function(request, response){
    const body = request.body

    var rsAcademia = await controllerAcademia.redefinirSenha(body)

    response.json(rsAcademia)
    response.status(rsAcademia.status)
})

// Retorna todas as academia existentes
app.get('/kalos/academia', cors(), async function (request, response){
    let pageNum = request.query.page


    let dadosAcademias = await controllerAcademia.getAcademias(pageNum)

    response.json(dadosAcademias)
    response.status(dadosAcademias.status)
})

app.get('/kalos/academia/teste', cors(), async function (request, response){
    let pageNum = request.query.page


    let dadosAcademias = await controllerAcademia.getAcademiasTestes(pageNum)

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
app.put('/kalos/academia', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let dadosAcademia = await controllerAcademia.atualizarAcademia(dadosBody )

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

// Autentica uma academia por email e senha
app.post('/kalos/academia/autenticar', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    if(String(contentType).toLowerCase() == 'application/json'){
        let dadosBody = request.body
        let resultDadosAcademia = await controllerAcademia.autenticarAcademia(dadosBody)

        response.status(resultDadosAcademia.status)
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

// retorna os últimos cinco alunos inseridos
app.get('/kalos/ultimosAlunos', cors(), async function(request, response){
    let dadosAlunos = await controllerAluno.getLastAlunos()

    response.json(dadosAlunos)
    response.status(dadosAlunos.status)
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

// Envia o e-mail com código de redefinição de senha
app.post('/kalos/aluno/esqueci_senha', bodyParserJSON, cors(), async function(request, response){
    const body = request.body
 
    var resposta = await funcoesNodemailerAluno.esqueciASenha(body)
 
    response.json(resposta)
    response.status(resposta.status)
 })
 
 // Valida o código de recuperação do usuário (que foi enviado)
 app.post('/kalos/aluno/validar_token', bodyParserJSON, cors(), async function(request, response){
     const body = request.body
 
     var rsAluno = await funcoesNodemailerAluno.verificarToken(body)
 
     response.status(rsAluno.status)
     response.json(rsAluno)
     
 })

 // Atualiza a senha
app.put('/kalos/aluno/redefinir_senha', bodyParserJSON, cors(), async function(request, response){
    const body = request.body

    var rsAluno = await controllerAluno.redefinirSenha(body)

    response.json(rsAluno)
    response.status(rsAluno.status)
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

/******************************************* ENDPOINTs REPETICAO ********************************************/

app.get('/kalos/repeticao', cors(), async function(request, response){
    let dadosRepeticao = await controllerRepeticao.getRepeticoes()

    response.status(dadosRepeticao.status)
    response.json(dadosRepeticao)
})

app.get('/kalos/repeticao/id/:id', cors(), async function(request, response){

    let idRepeticao = request.params.id

    let dadosRepeticao = await controllerRepeticao.getRepeticaoByID(idRepeticao)

    response.status(dadosRepeticao.status)
    response.json(dadosRepeticao)
})

app.post('/kalos/repeticao', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let resultadoRepeticao = await controllerRepeticao.inserirRepeticao(dadosBody)

    response.status(resultadoRepeticao.status)
    response.json(resultadoRepeticao)

})

app.put('/kalos/repeticao/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idRepeticao = request.params.id

    let resultadoRepeticao = await controllerRepeticao.atualizarRepeticao(dadosBody, idRepeticao)

    response.status(resultadoRepeticao.status)
    response.json(resultadoRepeticao)
})

app.delete('/kalos/repeticao/id/:id', cors(), async function(request, response){

    let idRepeticao = request.params.id

    let dadosRepeticao = await controllerRepeticao.deletarRepeticao(idRepeticao)

    response.status(dadosRepeticao.status)
    response.json(dadosRepeticao)

})

/******************************************* ENDPOINTs SERIE ********************************************/

app.get('/kalos/serie', cors(), async function(request, response){

    let dadosSerie = await controllerSerie.getSeries()

    response.status(dadosSerie.status)
    response.json(dadosSerie)
})

app.get('/kalos/serie/id/:id', cors(), async function(request, response){

    let idSerie = request.params.id

    let dadosSerie = await controllerSerie.getSerieByID(idSerie)

    response.status(dadosSerie.status)
    response.json(dadosSerie)
})

app.post('/kalos/serie', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let dadosSerie = await controllerSerie.inserirSerie(dadosBody)

    response.status(dadosSerie.status)
    response.json(dadosSerie)
})

app.put('/kalos/serie/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idSerie = request.params.id

    let dadosSerie = await controllerSerie.atualizarSerie(dadosBody, idSerie)

    response.status(dadosSerie.status)
    response.json(dadosSerie)
})

app.delete('/kalos/serie/id/:id', cors(),async function(request, response){

    let idSerie = request.params.id

    let dadosSerie = await controllerSerie.deletarSerie(idSerie)

    response.status(dadosSerie.status)
    response.json(dadosSerie)
})

/******************************************* ENDPOINTs ALUNO-ACADEMIA ********************************************/

// Retorna um aluno específico de uma academia específica
app.get('/kalos/alunoAcademia/id/:id', cors(), async function(request, response){

    let idAlunoAcademia = request.params.id

    let dadosAlunoAcademia = await controllerAlunoAcademia.getAlunoAcademiaById(idAlunoAcademia)

    response.status(dadosAlunoAcademia.status)
    response.json(dadosAlunoAcademia)
})
// Retorna todos alunos de uma academia específica
app.get('/kalos/alunoAcademia/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia

    let dadosAlunoAcademia = await controllerAlunoAcademia.getAllAlunosByIdAcademia(idAcademia)

    response.status(dadosAlunoAcademia.status)
    response.json(dadosAlunoAcademia)
})
// Retorna os último cinco alunos cadastrados de uma academia específica
app.get('/kalos/ultimosAlunos/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia

    let dadosAlunoAcademia = await controllerAlunoAcademia.getLastAlunos(idAcademia)

    response.status(dadosAlunoAcademia.status)
    response.json(dadosAlunoAcademia)
})

// Retorna as academias do aluno, pelo seu ID
app.get('/kalos/alunoAcademia/idAluno/:idAluno', cors(), async function(request, response){

    let idAluno = request.params.idAluno

    let dadosAlunoAcademia = await controllerAlunoAcademia.getAcademiasAlunoByID(idAluno)

    response.status(dadosAlunoAcademia.status)
    response.json(dadosAlunoAcademia)
})

app.get('/kalos/alunoAcademiaGrafico/mes/:mes/idAcademia/:idAcademia', cors(), async function(request, response){

    let numeroMes = request.params.mes

    let idAcademia = request.params.idAcademia

    let dadosGrafico = await controllerAlunoAcademia.getAlunosPerMonth(numeroMes, idAcademia)

    response.status(dadosGrafico.status)
    response.json(dadosGrafico)

})
// Insere um aluno na academia
app.post('/kalos/alunoAcademia', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber em dados JSON
    if(String(contentType).toLowerCase() == 'application/json'){

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultadoDadosAlunoAcademia = await controllerAlunoAcademia.inserirAlunoAcademia(dadosBody)

        response.status(resultadoDadosAlunoAcademia.status)
        response.json(resultadoDadosAlunoAcademia)
    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPEs)

    }

    
})

// Insere novos dados ao aluno (a academia)
app.put('/kalos/alunoAcademia/id/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){

        //recebe os dados do aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        //recebe o ID  do aluno pelo parametro
        let idAlunoAcademia = request.params.id

        let resultadoDadosAlunoAcademia = await controllerAlunoAcademia.atualizarAlunoAcademia( idAlunoAcademia, dadosBody)

        response.status(resultadoDadosAlunoAcademia.status)
        response.json(resultadoDadosAlunoAcademia)
    }else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)

    }
})

// Deleta um aluno de uma academia
app.delete('/kalos/alunoAcademia/idAluno/:idAluno/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAluno = request.params.idAluno
    let idAcademia = request.params.idAcademia

    let dadosAlunoAcademia = await controllerAlunoAcademia.deletarAlunoDaAcademia(idAluno, idAcademia)

    response.status(dadosAlunoAcademia.status)
    response.json(dadosAlunoAcademia)
})


/******************************************* ENDPOINTs EXERCICIO ********************************************/

app.get('/kalos/exercicio/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia

    let dadosExercicio = await controllerExercicio.getExercicios(idAcademia)

    response.status(dadosExercicio.status)
    response.json(dadosExercicio)
})

app.get('/kalos/exercicio/id/:id', cors(), async function(request, response){

    let idExercicio = request.params.id

    let dadosExercicio = await controllerExercicio.getExercicioByID(idExercicio)

    response.status(dadosExercicio.status)
    response.json(dadosExercicio)

})

app.post('/kalos/exercicio', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let resultadoDadosExercicio = await controllerExercicio.inserirExercicio(dadosBody)

        response.status(resultadoDadosExercicio.status)
        response.json(resultadoDadosExercicio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.put('/kalos/exercicio/id/:id', cors(), bodyParserJSON, async function(request, response){

     let dadosBody = request.body

    let idExercicio = request.params.id

    let resultadoExercicio = await controllerExercicio.atualizarExercicio(dadosBody, idExercicio)

    response.status(resultadoExercicio.status)
    response.json(resultadoExercicio)
    
})

app.delete('/kalos/exercicio/id/:id', cors(), async function(request, response){

    let idExercicio = request.params.id

    let dadosExercicio = await controllerExercicio.deletarExercicio(idExercicio)

    response.status(dadosExercicio.status)
    response.json(dadosExercicio)
})

/******************************************* ENDPOINTs TREINO-NIVEL-CATEGORIA ********************************************/

app.get('/kalos/treinoNivelCategoria/id/:id', cors(), async function(request, response){

    let idTreinoNivelCategoria = request.params.id

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getTreinoNivelCategoriaById(idTreinoNivelCategoria)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})

app.get('/kalos/treinoNivelCategoria/idAcademia/:id', cors(), async function(request, response){

    let idAcademia = request.params.id

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getTreinoNivelCategoriaByIdAcademia(idAcademia)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})

app.get('/kalos/treinoNivelCategoria/idAluno/:id', cors(), async function(request, response){

    let idAluno = request.params.id

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getTreinoNivelCategoriaByIdAluno(idAluno)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})

app.get('/kalos/treinoNivelCategoria/idAluno/:idAluno/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAluno = request.params.idAluno
    let idAcademia = request.params.idAcademia

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getTreinoNivelCategoriaByIdAlunoAndIdAcademia(idAluno, idAcademia)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})

app.get('/kalos/treinoNivelCategoria/idAcademia/:idAcademia/idTreinoNivelCategoria/:idTreinoNivelCategoria', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia
    let idTreinoNivelCategoria = request.params.idTreinoNivelCategoria

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getAlunoOnTreinoNivelCategoriaByIdAcademiaAndIdTreino(idAcademia, idTreinoNivelCategoria)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})

app.get('/kalos/treinoNivelCategoria/nome/:nomeTreinoNivelCategoria/idAcademia/:idAcademia', cors(), async function (request, response){

    let nomeTreino = request.params.nomeTreinoNivelCategoria
    let idAcademia = request.params.idAcademia

    let dadosTreinoNivelCategoria = await controllerTreinoNivelCategoria.getTreinoNivelCategoriaByName(nomeTreino, idAcademia)

    response.status(dadosTreinoNivelCategoria.status)
    response.json(dadosTreinoNivelCategoria)
})



/******************************************* ENDPOINTs EXERCICIO-SERIE-REPETICAO ********************************************/

app.get('/kalos/exercicioSerieRepeticao/id/:id', cors(), async function(request, response){

    let idExercicioSerieRepeticao = request.params.id

    let dadosExercicioSerieRepeticao = await controllerExercicioSerieRepeticao.getExercicioSerieRepeticaoById(idExercicioSerieRepeticao)

    response.status(dadosExercicioSerieRepeticao.status)
    response.json(dadosExercicioSerieRepeticao)

})

app.get('/kalos/exercicioSerieRepeticao/idTreino/:id', cors(), async function(request, response){

    let idTreino = request.params.id

    let dadosExercicioSerieRepeticao = await controllerExercicioSerieRepeticao.getExercicioSerieRepeticaoByIdTreino(idTreino)

    response.status(dadosExercicioSerieRepeticao.status)
    response.json(dadosExercicioSerieRepeticao)

})

/******************************************* ENDPOINTs ALUNO-TREINO ********************************************/


// retorna todos os alunos com treinos atribuidos
app.get('/kalos/alunoTreino', cors(), async function(request, response){

    let dadosAlunoTreino = await controllerAlunoTreino.getAlunoTreinos()

    response.status(dadosAlunoTreino.status)
    response.json(dadosAlunoTreino)
})

// retorna um aluno com treino atribuido especifico
app.get('/kalos/alunoTreino/id/:id', cors(), async function(request, response){

    let idAlunoTreino = request.params.id

    let dadosAlunoTreino = await controllerAlunoTreino.getAlunoTreinoById(idAlunoTreino)

    response.status(dadosAlunoTreino.status)
    response.json(dadosAlunoTreino)
})

// retorna os alunos com treinos atribuidos de uma academia específica
app.get('/kalos/alunoTreino/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia

    let dadosAlunoTreino = await controllerAlunoTreino.getAlunoTreinoByIdAcademia(idAcademia)

    response.status(dadosAlunoTreino.status)
    response.json(dadosAlunoTreino)
})

// atribui um treino ou mais a um aluno
app.post('/kalos/alunoTreino', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){
        
        let dadosBody = request.body

        let resultadoDadosAlunoTreino = await controllerAlunoTreino.inserirAlunoTreino(dadosBody)

        response.status(resultadoDadosAlunoTreino.status)
        response.json(resultadoDadosAlunoTreino)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})
// atribui um aluno ou mais a um treino
app.post('/kalos/treinoAluno', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let resultadoAlunosTreino = await controllerAlunoTreino.inserirTreinoAluno(dadosBody)

        response.status(resultadoAlunosTreino.status)
        response.json(resultadoAlunosTreino)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.status(message.ERROR_INVALID_CONTENT_TYPE.message)
    }

})
app.delete('/kalos/alunoTreino/id/:id', cors(), async function(request, response){
    
    let idAlunoTreino = request.params.id

    let dadosAlunoTreino = await controllerAlunoTreino.deletarAlunoTreino(idAlunoTreino)

    response.status(dadosAlunoTreino.status)
    response.json(dadosAlunoTreino)
})

/******************************************* ENDPOINTs CATEGORIA ********************************************/

app.get('/kalos/categoria', cors(), async function(request, response){

    let dadosCategoria = await controllerCategoria.getCategorias()

    response.status(dadosCategoria.status)
    response.json(dadosCategoria)
})

/******************************************* ENDPOINTs POSTAGEM ********************************************/


app.get('/kalos/postagem/id/:id', cors(), async function(request, response){

    let idPostagem = request.params.id

    let dadosPostagem = await controllerPostagem.getPostagemByID(idPostagem)

    response.status(dadosPostagem.status)
    response.json(dadosPostagem)
})

app.get('/kalos/postagem/idAcademia/:idAcademia', cors(), async function(request, response){
    
    let idAcademia = request.params.idAcademia

    let dadosPostagem = await controllerPostagem.getPostagensByIdAcademia(idAcademia)

    response.status(dadosPostagem.status)
    response.json(dadosPostagem)
})
// Insere uma nova postagem
app.post('/kalos/postagem', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let resultadoDadosPostagem = await controllerPostagem.inserirPostagem(dadosBody)

        response.status(resultadoDadosPostagem.status)
        response.json(resultadoDadosPostagem)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

// Atualiza uma postagem
app.put('/kalos/postagem/id/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){
        

        let dadosBody = request.body

        let idPostagem = request.params.id

        let resultadoDadosPostagem = await controllerPostagem.atualizarPostagem(dadosBody, idPostagem)

        response.status(resultadoDadosPostagem.status)
        response.json(resultadoDadosPostagem)
    }else {
        
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.delete('/kalos/postagem/id/:id', cors(), async function(request, response){

    let idPostagem = request.params.id

    let dadosPostagem = await controllerPostagem.deletarPostagem(idPostagem)

    response.status(dadosPostagem.status)
    response.json(dadosPostagem)
})

/******************************************* ENDPOINTs CARGA ********************************************/

app.get('/kalos/carga/id/:id', cors(), async function(request, response){

    let idCarga = request.params.id

    let dadosCarga = await controllerCarga.getCargaByID(idCarga)

    response.status(dadosCarga.status)
    response.json(dadosCarga)
})

app.get('/kalos/carga/idAluno/:idAluno/idESR/:idESR', cors(), async function(request, response){

    let idAluno = request.params.idAluno

    let idESR = request.params.idESR

    let dadosCarga = await controllerCarga.getCargaByIdAlunoAndIdExercicioSerieRepeticao(idAluno, idESR)

    response.status(dadosCarga.status)
    response.json(dadosCarga)

})

app.post('/kalos/carga', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let resultadoDadosCarga = await controllerCarga.inserirCarga(dadosBody)

        response.status(resultadoDadosCarga.status)
        response.json(resultadoDadosCarga)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.put('/kalos/carga/id/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let idCarga = request.params.id

        let resultadoDadosCarga = await controllerCarga.atualizarCarga(dadosBody, idCarga)

        response.status(resultadoDadosCarga.status)
        response.json(resultadoDadosCarga)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.delete('/kalos/carga/id/:id', cors(), async function(request, response){

    let idCarga = request.params.id

    let dadosCarga = await controllerCarga.deletarCarga(idCarga)

    response.status(dadosCarga.status)
    response.status(dadosCarga)

})

/******************************************* ENDPOINTs categoria produto ********************************************/

app.get('/kalos/categoriaProduto/:id', cors(), async function(request, response){
    let idCategoriaProduto = request.params.id

    let dadosCategoriaProduto = await controllerCategoriaProduto.getCategoriaProdutoById(idCategoriaProduto)

    response.status(dadosCategoriaProduto.status)
    response.json(dadosCategoriaProduto)
})

app.get('/kalos/categoriaProduto', cors(), async function(request, response){
    

    let dadosCategoriaProduto = await controllerCategoriaProduto.getCategoriaProduto()

    response.status(dadosCategoriaProduto.status)
    response.json(dadosCategoriaProduto)
})

app.post('/kalos/categoriaProduto', cors(), bodyParserJSON,async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let dadosCategoriaProduto = await controllerCategoriaProduto.inserirCategoriaProduto(dadosBody)

        response.status(dadosCategoriaProduto.status)
        response.json(dadosCategoriaProduto)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
    
})

app.put('/kalos/categoriaProduto/id/:id', cors(), bodyParserJSON,async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let idCategoriaProduto = request.params.id
        let dadosBody = request.body
        

        let dadosCategoriaProduto = await controllerCategoriaProduto.atualizarCategoriaProduto(dadosBody, idCategoriaProduto)
        console.log(dadosCategoriaProduto)
        response.status(dadosCategoriaProduto.status)
        response.json(dadosCategoriaProduto)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
    
})

app.delete('/kalos/categoriaProduto/:id', cors(), async function(request, response){
    let idCategoriaProduto = request.params.id

    let dadosCategoriaProduto = await controllerCategoriaProduto.deletarCategoriaProduto(idCategoriaProduto)

    response.status(dadosCategoriaProduto.status)
    response.json(dadosCategoriaProduto)
})


/******************************************* ENDPOINTs produto ********************************************/

app.get('/kalos/produto/id/:id', cors(), async function(request, response){
    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.getProdutoById(idProduto)

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

app.get('/kalos/produto', cors(), async function(request, response){
    
    let dadosProduto = await controllerProduto.getProduto()

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

app.get('/kalos/produtoByIdAcademia/id/:id', cors(), async function(request, response){
    let idAcademia = request.params.id
    let dadosProduto = await controllerProduto.getProdutoByIdAcademia(idAcademia)

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

app.post('/kalos/produto', cors(), bodyParserJSON,async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let dadosBody = request.body

        let dadosProduto = await controllerProduto.inserirProduto(dadosBody)

        response.status(dadosProduto.status)
        response.json(dadosProduto)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
    
})

app.put('/kalos/produto/id/:id', cors(), bodyParserJSON,async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){

        let idProduto = request.params.id
        let dadosBody = request.body
        

        let dadosProduto = await controllerProduto.atualizarProduto(dadosBody, idProduto)
        
        response.status(dadosProduto.status)
        response.json(dadosProduto)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
    
})

app.delete('/kalos/produto/id/:id', cors(), async function(request, response){
    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.deletarProduto(idProduto)

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})


/******************************************* ENDPOINTs NIVEL ********************************************/

app.get('/kalos/nivel', cors(), async function(request, response){

    let dadosNivel = await controllerNivel.getNiveis()

    response.status(dadosNivel.status)
    response.json(dadosNivel)
})

app.get('/kalos/nivel/id/:id', cors(), async function(request, response){

    let idNivel = request.params.id

    let dadosNivel = await controllerNivel.getNivelByID(idNivel)

    response.status(dadosNivel.status)
    response.json(dadosNivel)
})

app.post('/kalos/nivel', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let resultadoDadosNivel = await controllerNivel.inserirNivel(dadosBody)

    response.status(resultadoDadosNivel.status)
    response.json(resultadoDadosNivel)
})

app.put('/kalos/nivel/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idNivel = request.params.id

    let resultadoDadosNivel = await controllerNivel.atualizarNivel(dadosBody, idNivel)

    response.status(resultadoDadosNivel.status)
    response.json(resultadoDadosNivel)
})

app.delete('/kalos/nivel/id/:id', cors(), async function(request, response){

    let idNivel = request.params.id

    let resultadoDadosNivel = await controllerNivel.deletarNivel(idNivel)

    response.status(resultadoDadosNivel.status)
    response.json(resultadoDadosNivel)
})


/******************************************* ENDPOINTs FOTOS ********************************************/
app.get('/kalos/fotos', cors(), async function(request, response){

    let dadosFotos = await controllerFotos.getFotos()

    response.status(dadosFotos.status)
    response.json(dadosFotos)
})

app.get('/kalos/fotos/id/:id', cors(), async function(request, response){

    let idFotos = request.params.id

    let dadosFotos = await controllerFotos.getFotosById(idFotos)

    response.status(dadosFotos.status)
    response.json(dadosFotos)
})

app.post('/kalos/fotos', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){
        
        let dadosBody = request.body

        let resultadoDadosFotos = await controllerFotos.inserirFotos(dadosBody)

        response.status(resultadoDadosFotos.status)
        response.json(resultadoDadosFotos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.put('/kalos/fotosByProduto/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idProduto = request.params.id

    let resultadoDadosFotos = await controllerFotos.atualizarFotos(dadosBody, idProduto)

    response.status(resultadoDadosFotos.status)
    response.json(resultadoDadosFotos)
})

app.delete('/kalos/fotosByProduto/id/:id', cors(), async function(request, response){

    let idProduto = request.params.id

    let resultadoDadosProduto = await controllerFotos.deletarFotos(idProduto)

    response.status(resultadoDadosProduto.status)
    response.json(resultadoDadosProduto)
})

/******************************************* ENDPOINTs RESERVAS ********************************************/

//Insere uma nova reserva
app.post('/kalos/reserva', cors(), bodyParserJSON, async function(request, response){
    console.log('bateu no endpoint');

    let contentType = request.headers['content-type']

    // validacao para receber em formato json
    if(String(contentType).toLowerCase() == 'application/json'){
        
        let dadosBody = request.body

        let rsReserva = await controllerReserva.inserirReserva(dadosBody)

        response.status(rsReserva.status)
        response.json(rsReserva)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

//Filtra as reservas pelo id do aluno e id da academia
app.get('/kalos/reserva/idAluno/:idAluno/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAluno = request.params.idAluno
    let idAcademia = request.params.idAcademia

    let reservas = await controllerReserva.getReservasByIdAlunoIdAcademia(idAcademia, idAluno)

    response.status(reservas.status)
    response.json(reservas)
})

//Filtra as reservas pelo id do aluno e id da academia
app.get('/kalos/reserva/idAcademia/:idAcademia', cors(), async function(request, response){

    let idAcademia = request.params.idAcademia

    let reservas = await controllerReserva.getReservasByIdAcademia(idAcademia)

    response.status(reservas.status)
    response.json(reservas)
})

//Atualiza uma reserva
app.put('/kalos/reserva/id/:id', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let idReserva = request.params.id

    let rsReserva = await controllerReserva.atualizarReserva(dadosBody, idReserva)

    response.status(rsReserva.status)
    response.json(rsReserva)
})

//Pega uma reserva por id
app.get('/kalos/reserva/id/:id', cors(), async function(request, response){

    let id = request.params.id

    let dadosReserva = await controllerReserva.getReservaById(id)

    response.status(dadosReserva.status)
    response.json(dadosReserva)
})

app.delete('/kalos/reserva/id/:id', cors(), async function(request, response){

    let id = request.params.id

    let rsReserva = await controllerReserva.deletarReserva(id)

    response.status(rsReserva.status)
    response.json(rsReserva)
})

app.listen(8080, function(){
    console.log('Aguardando requisições na porta 8080')
})