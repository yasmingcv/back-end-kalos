/******
 * Objetivo: Arquivo de controle dos dados de repeticoes de treino em nosso sistema
 * Data: 20/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var repeticaoDAO = require('../model/DAO/repeticaoDAO.js')

var message = require('./modulo/config.js')

// Retorna todas as repeticoes
const getRepeticoes = async function(){

    let dadosRepeticaoJSON = {}

    let dadosRepeticao = await repeticaoDAO.selectAllRepeticoes()

    if(dadosRepeticao){

        dadosRepeticaoJSON.status = message.SUCCESS_REQUEST.status
        dadosRepeticaoJSON.message = message.SUCCESS_REQUEST.message
        dadosRepeticaoJSON.quantidade = dadosRepeticao.length
        dadosRepeticaoJSON.listaRepeticoes = dadosRepeticao

        return dadosRepeticaoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

// Retorna uma repeticao pelo id
const getRepeticaoByID = async function(idRepeticao){

    let dadosRepeticaoJSON = {}

    if(idRepeticao == '' || idRepeticao == undefined || isNaN(idRepeticao)){

        return message.ERROR_INVALID_ID
    } else {

        let dadosRepeticao = await repeticaoDAO.selectRepeticaoByID(idRepeticao)

        if(dadosRepeticao){

            dadosRepeticaoJSON.status = message.SUCCESS_REQUEST.status
            dadosRepeticaoJSON.message = message.SUCCESS_REQUEST.message
            dadosRepeticaoJSON.repeticao = dadosRepeticao

            return dadosRepeticaoJSON
        } else {
            message.ERROR_NOT_FOUND
        }
    }
}

// Insere uma repeticao
const inserirRepeticao = async function(dadosRepeticao){

    if(dadosRepeticao.numero == '' || dadosRepeticao.numero == undefined){

        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoRepeticao = await repeticaoDAO.insertRepeticao(dadosRepeticao)

        if(resultadoRepeticao){

            let novaRepeticao = await repeticaoDAO.selectLastId()

            let dadosRepeticaoJSON = {}

            dadosRepeticaoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosRepeticaoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosRepeticaoJSON.repeticao = novaRepeticao[0]

            return dadosRepeticaoJSON
        } else {

            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarRepeticao = async function(dadosRepeticao, idRepeticao){

    if(dadosRepeticao.numero == '' || dadosRepeticao.numero == undefined){
        
        return message.ERROR_REQUIRED_FIELDS
    } else if (idRepeticao == '' || idRepeticao == undefined || isNaN(idRepeticao)){

        return message.ERROR_INVALID_ID
    } else {

        dadosRepeticao.id = idRepeticao

        let statusId = await repeticaoDAO.selectRepeticaoByID(idRepeticao)

        if(statusId){
            let resultadoRepeticao = await repeticaoDAO.updateRepeticao(dadosRepeticao)

            if(resultadoRepeticao){

                let dadosRepeticaoJSON = {}

                dadosRepeticaoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosRepeticaoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosRepeticaoJSON.repeticao = dadosRepeticao

                return dadosRepeticaoJSON
            } else {

                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

// Deleta uma repeticao
const deletarRepeticao = async function(idRepeticao){

    if(idRepeticao == '' || idRepeticao == undefined || isNaN(idRepeticao)){

        return message.ERROR_INVALID_ID
    } else {

        let statusId = repeticaoDAO.selectRepeticaoByID(idRepeticao)

        if(statusId){

            let resultadoRepeticao = await repeticaoDAO.deleteRepeticao(idRepeticao)

            if(resultadoRepeticao){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

module.exports = {
    inserirRepeticao,
    atualizarRepeticao,
    deletarRepeticao,
    getRepeticaoByID,
    getRepeticoes
}