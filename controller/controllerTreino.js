/******
 * Objetivo: Arquivo de controle dos dados de um treino em nosso sistema
 * Data: 03/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var treinoDAO = require('../model/DAO/treinoDAO.js')

var message = require('./modulo/config.js')

const getTreinos = async function(){
    
    let dadosTreinoJSON = {}

    let dadosTreino = await treinoDAO.selectAllTreinos()

    if(dadosTreino){
        dadosTreinoJSON.status = message.SUCCESS_REQUEST.status
        dadosTreinoJSON.message = message.SUCCESS_REQUEST.message
        dadosTreinoJSON.quantidade = dadosTreino.length
        dadosTreinoJSON.treinos = dadosTreino

        return dadosTreinoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getTreinoByID = async function(idTreino){
    
    let dadosTreinoJSON = {}

    if(idTreino == '' || idTreino == undefined || isNaN(idTreino)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosTreino = await treinoDAO.selectTreinoById(idTreino)

        if(dadosTreino){

            dadosTreinoJSON.status = message.SUCCESS_REQUEST.status
            dadosTreinoJSON.message = message.SUCCESS_REQUEST.message
            dadosTreinoJSON.treino = dadosTreino

            return dadosTreinoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}
const inserirTreino = async function (dadosTreino) {

    // Validação de campos
    if (
        dadosTreino.nome == '' || dadosTreino.nome == undefined || !isNaN(dadosTreino.nome) ||
        dadosTreino.foto == '' || dadosTreino.foto == undefined) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosTreino = await treinoDAO.insertTreino(dadosTreino)

        if (resultadoDadosTreino) {

            let novoTreino = await treinoDAO.selectLastId()
            let dadosTreinoJSON = {}

            dadosTreinoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosTreinoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosTreinoJSON.treino = novoTreino

            return dadosTreinoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}
const atualizarTreino = async function (dadosTreino, idTreino) {
    if (
        dadosTreino.nome == '' || dadosTreino.nome == undefined ||
        dadosTreino.foto == '' || dadosTreino.foto == undefined)
        {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idTreino == '' || idTreino == undefined || isNaN(idTreino)) {
        return message.ERROR_INVALID_ID
    } else {
        dadosTreino.id = idTreino

        let statusId = await treinoDAO.selectTreinoById(idTreino)

        if (statusId) {
            let resultadoDadosTreino = await treinoDAO.updateTreino(dadosTreino)

            if (resultadoDadosTreino) {

                let dadosTreinoJSON = {}

                dadosTreinoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosTreinoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosTreinoJSON.treino = dadosTreino

                return dadosTreinoJSON
            } else{
                return message.ERROR_INTERNAL_SERVER
            }
        } else{
            return message.ERROR_INVALID_ID
        }
    }
}
const deletarTreino = async function (idTreino){
    if(idTreino == '' || idTreino == undefined || isNaN(idTreino)){
        return message.ERROR_INVALID_ID
    } else {
        let statusId = treinoDAO.selectTreinoById(idTreino)

        if(statusId){
            let resultadoDadosTreino = await treinoDAO.deleteTreino(idTreino)

            if(resultadoDadosTreino){
                return message.SUCCESS_DELETE_ITEM
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        } else{
            return message.ERROR_INVALID_ID
        }
    }
}

module.exports = {
    inserirTreino,
    atualizarTreino,
    deletarTreino,
    getTreinoByID,
    getTreinos
}