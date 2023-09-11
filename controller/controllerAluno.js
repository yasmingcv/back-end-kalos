/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos alunos em nosso sistema
 * Data: 05/09/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var alunoDAO = require('../model/DAO/alunoDAO.js')

var message = require('./modulo/config.js') 

// Retorna todos os alunos existentens no banco de dados
const getAlunos = async function(){

    let dadosAlunosJSON = {}

    let dadosAluno = await alunoDAO.selectAllAlunos()

    if(dadosAluno){
        dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
        dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
        dadosAlunosJSON.quantidade = dadosAluno.length
        dadosAlunosJSON.alunos = dadosAluno

        return dadosAlunosJSON
    } else{
        return message.ERROR_NOT_FOUND
    }
}

// Retorna um aluno específico de acordo com o ID
const getAlunoById = async function(idAluno){

    let dadosAlunosJSON = {}

    if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAluno = await alunoDAO.selectAlunoById(idAluno)

        if(dadosAluno){

            dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunosJSON.aluno = dadosAluno

            return dadosAlunosJSON
        } else{
            return message.ERROR_NOT_FOUND
        }
    }
}

// Retorna alunos específicos de acordo com um filtro de nome
const getAlunoByName = async function(nomeAluno){
    let dadosAlunosJSON = {}

    if(nomeAluno == '' || nomeAluno == undefined || !isNaN(nomeAluno)){
        return message.ERROR_INVALID_NAME
    } else {

        let dadosAluno = await alunoDAO.selectAlunoByName(nomeAluno)

        if(dadosAluno){

            dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunosJSON.alunos = dadosAluno

            return dadosAlunosJSON
        } else{
            return message.ERROR_NOT_FOUND
        }
    }
}

// Insere um novo aluno
const inserirAluno = async function(dadosAluno){

    // Validação para tratar campos obrigatórios e caracteres

    if( dadosAluno.nome == '' || dadosAluno.nome == undefined || !isNaN(dadosAluno) || dadosAluno.nome.length > 100 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10 ||
        dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf.length > 9 || isNaN(dadosAluno.cpf) ||
        dadosAluno.telefone == '' || dadosAluno.telefone == undefined || isNaN(dadosAluno.telefone) || dadosAluno.telefone.length > 12 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 250 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha < 12 ||
        dadosAluno.questao_condicao_medica == '' || dadosAluno.questao_condicao_medica == undefined ||
        dadosAluno.questao_lesoes == '' || dadosAluno.questao_lesoes == undefined ||
        dadosAluno.questao_medicamento == '' || dadosAluno.questao_medicamento == undefined ||
        dadosAluno.objetivo == '' || dadosAluno.objetivo == undefined
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else{
        
        let resultadoDadosAluno = await alunoDAO.insertAluno(dadosAluno)

        if(resultadoDadosAluno){

            let novoAluno = await alunoDAO.selectLastId()

            let dadosAlunoJSON = {}

            dadosAlunoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosAlunoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosAlunoJSON.aluno = novoAluno

            return dadosAlunoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

// Atualiza os dados de um aluno
const atualizarAluno = async function(dadosAluno, idAluno){
    // Validação para tratar campos obrigatórios e caracteres

    if( dadosAluno.nome == '' || dadosAluno.nome == undefined || !isNaN(dadosAluno) || dadosAluno.nome.length > 100 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10 ||
        dadosAluno.cpf == '' || dadosAluno.cpf == undefined || dadosAluno.cpf.length > 9 || isNaN(dadosAluno.cpf) ||
        dadosAluno.telefone == '' || dadosAluno.telefone == undefined || isNaN(dadosAluno.telefone) || dadosAluno.telefone.length > 12 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 250 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha < 12 ||
        dadosAluno.questao_condicao_medica == '' || dadosAluno.questao_condicao_medica == undefined ||
        dadosAluno.questao_lesoes == '' || dadosAluno.questao_lesoes == undefined ||
        dadosAluno.questao_medicamento == '' || dadosAluno.questao_medicamento == undefined ||
        dadosAluno.objetivo == '' || dadosAluno.objetivo == undefined
    ){
        return message.ERROR_REQUIRED_FIELDS

    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)){

        return message.ERROR_INVALID_ID

    } else {
        dadosAluno.id = idAluno

        let statusId = await alunoDAO.selectAlunoById(idAluno)

        if(statusId){
            let resultadoDadosAluno = await alunoDAO.updateAluno(dadosAluno)

            if(resultadoDadosAluno){
                let dadosAlunoJSON = {}

                dadosAlunoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosAlunoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosAlunoJSON.aluno = dadosAluno

                return dadosAlunoJSON
            } else{
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }

}

const deletarAluno = async function(idAluno){

    if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await alunoDAO.selectAlunoById(idAluno)

        if(statusId){

            let resultadoDadosAluno = await alunoDAO.deleteAluno(idAluno)

            if(resultadoDadosAluno){
                return message.SUCCESS_DELETE_ITEM
            } else{
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

const autenticarAluno = async function(dadosAluno){
    const dados = await alunoDAO.selectAlunoByPassword(dadosAluno)
   
    const jwt = require('../middleware/jwtAluno.js')

    if(dados){
        let tokenUser = await jwt.createJWT(dados.id)
        dados[0].token = tokenUser

        return dados[0]

    } else {
        return message.ERROR_UNAUTHORIZED
    }
}

module.exports = {
    getAlunos,
    getAlunoById,
    getAlunoByName,
    inserirAluno,
    atualizarAluno,
    deletarAluno,
    autenticarAluno
}