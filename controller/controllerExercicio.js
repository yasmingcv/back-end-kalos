/******
 * Objetivo: Arquivo de controle dos dados de exercicios em nosso sistema
 * Data: 25/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var exercicioDAO = require('../model/DAO/exercicioDAO.js')

var message = require('./modulo/config.js')

// Retorna todos os exercícios da academia
const getExercicios = async function(idAcademia){

    let dadosExercicioJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

    let dadosExercicio = await exercicioDAO.selectAllExercicios(idAcademia)

    if(dadosExercicio){

        dadosExercicioJSON.status = message.SUCCESS_REQUEST.status
        dadosExercicioJSON.message = message.SUCCESS_REQUEST.message
        dadosExercicioJSON.quantidade = dadosExercicio.length
        dadosExercicioJSON.exercicios = dadosExercicio

        return dadosExercicioJSON
    } else
        return message.ERROR_NOT_FOUND

    }
}

// Retorna um exercicio qualquer pelo id
const getExercicioByID = async function(idExercicio){

    let dadosExercicioJSON = {}

    if(idExercicio == '' || idExercicio == undefined || isNaN(idExercicio)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosExercicio = await exercicioDAO.selectExercicioByID(idExercicio)

        if(dadosExercicio){

            dadosExercicioJSON.status = message.SUCCESS_REQUEST.status
            dadosExercicioJSON.message = message.SUCCESS_REQUEST.message
            dadosExercicioJSON.exercicio = dadosExercicio

            return dadosExercicioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

// Retorna um exercício pelo nome
const getExercicioByName = async function(nomeExercicio){

    let dadosExercicioJSON = {}

    if(nomeExercicio == '' || nomeExercicio == undefined || !isNaN(nomeExercicio)){
        return message.ERROR_INVALID_NAME
    } else {

        let dadosExercicio = await exercicioDAO.selectExercicioByName(nomeExercicio)

        if(dadosExercicio){

            dadosExercicioJSON.status = message.SUCCESS_REQUEST.status
            dadosExercicioJSON.message = message.SUCCESS_REQUEST.message
            dadosExercicioJSON.exercicio = dadosExercicio

            return dadosExercicioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

// Retorna um exercício pelo nome
const getExercicioByNameAndIdAcademia = async function(nomeExercicio, idAcademia){

    let dadosExercicioJSON = {}

    if(
        nomeExercicio == '' || nomeExercicio == undefined || !isNaN(nomeExercicio)
        
    ){
        return message.ERROR_INVALID_NAME
    }else if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosExercicio = await exercicioDAO.selectExercicioByNameAndIdAcademia(nomeExercicio, idAcademia)

        if(dadosExercicio){

            dadosExercicioJSON.status = message.SUCCESS_REQUEST.status
            dadosExercicioJSON.message = message.SUCCESS_REQUEST.message
            dadosExercicioJSON.exercicio = dadosExercicio

            return dadosExercicioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

// Insere um novo exercicio
const inserirExercicio = async function(dadosExercicio){

    if(
        dadosExercicio.nome == '' || dadosExercicio.nome == undefined ||
        dadosExercicio.descricao.length > 200 ||
        dadosExercicio.anexo == '' || dadosExercicio.anexo == undefined
    ){
     return message.ERROR_REQUIRED_FIELDS   
    } else {

        let resultadoDadosExercicio = await exercicioDAO.insertExercicio(dadosExercicio)

        if(resultadoDadosExercicio){

            let novoExercicio = await exercicioDAO.selectLastId()

            let dadosExercicioJSON = {}

            dadosExercicioJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosExercicioJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosExercicioJSON.exercicio = novoExercicio[0]

            return dadosExercicioJSON
        } else 
            return message.ERROR_INTERNAL_SERVER
    }
}

// Atualiza um exercício
const atualizarExercicio = async function(dadosExercicio, idExercicio){

    if(
        dadosExercicio.nome == '' || dadosExercicio.nome == undefined ||
        dadosExercicio.descricao.length > 200 ||
        dadosExercicio.anexo == '' || dadosExercicio.anexo == undefined
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else if(idExercicio == '' || idExercicio == undefined || isNaN(idExercicio)){

        return message.ERROR_INVALID_ID
    } else {
        dadosExercicio.id = idExercicio

        let statusId = await exercicioDAO.selectExercicioByID(idExercicio)


        if(statusId){
            let resultadoExercicio = await exercicioDAO.updateExercicio(dadosExercicio)

            if(resultadoExercicio){

                let dadosExercicioJSON = {}

                dadosExercicioJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosExercicioJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosExercicioJSON.exercicio = dadosExercicio

                return dadosExercicioJSON
            }

        }
    }
}

// Deleta um exercício
const deletarExercicio = async function(idExercicio){

    if(idExercicio == '' || idExercicio == undefined || isNaN(idExercicio)){

        return message.ERROR_INVALID_ID
    } else {

        let statusId = exercicioDAO.selectExercicioByID(idExercicio)

        if(statusId){
            let resultadoExercicio = await exercicioDAO.deleteExercicio(idExercicio)

            if(resultadoExercicio){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            message.ERROR_INVALID_ID
        }
    }
}

module.exports = {
    getExercicioByID,
    getExercicios,
    getExercicioByName,
    inserirExercicio,
    atualizarExercicio,
    deletarExercicio,
    getExercicioByNameAndIdAcademia
}