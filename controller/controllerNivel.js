/******
 * Objetivo: Arquivo de controle dos dados de níveis de treino em nosso sistema
 * Data: 19/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var nivelDAO = require('../model/DAO/nivelDAO.js')

var message = require('./modulo/config.js')

// Retorna todos os níveis
const getNiveis = async function(){

    let dadosNiveisJSON = {}

    let dadosNiveis = await nivelDAO.selectAllNiveis()

    if(dadosNiveis){
        dadosNiveisJSON.status = message.SUCCESS_REQUEST.status
        dadosNiveisJSON.message = message.SUCCESS_REQUEST.message
        dadosNiveisJSON.quantidade = dadosNiveis.length
        dadosNiveisJSON.niveis = dadosNiveis

        return dadosNiveisJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

// Retorna um nível pelo id
const getNivelByID = async function(idNivel){

    let dadosNiveisJSON = {}

    if(idNivel == '' || idNivel == undefined || isNaN(idNivel)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosNivel = await nivelDAO.selectNivelById(idNivel)

        if(dadosNivel){

            dadosNiveisJSON.status = message.SUCCESS_REQUEST.status
            dadosNiveisJSON.message = message.SUCCESS_REQUEST.message
            dadosNiveisJSON.nivel = dadosNivel

            return dadosNiveisJSON
        } else {
            message.ERROR_NOT_FOUND
        }
    }
}

// Insere um novo nível
const inserirNivel = async function (dadosNivel){

    if(dadosNivel.nome == '' || dadosNivel.nome == undefined || !isNaN(dadosNivel.nome)){
        
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosNivel = await nivelDAO.insertTreino(dadosNivel)

        if(resultadoDadosNivel){

            let novoNivel = await nivelDAO.selectLastId()

            let dadosNiveisJSON = {}

            dadosNiveisJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosNiveisJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosNiveisJSON.nivel = novoNivel[0]

            return dadosNiveisJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

// Atualiza um nivel
const atualizarNivel = async function(dadosNivel, idNivel){
    if(dadosNivel.nome == '' || dadosNivel.nome == undefined || !isNaN(dadosNivel.nome)){

        return message.ERROR_REQUIRED_FIELDS
    } else if (idNivel == '' || idNivel == undefined || isNaN(idNivel)){

        return message.ERROR_INVALID_ID
    } else {
        dadosNivel.id = idNivel

        let statusId = await nivelDAO.selectNivelById(idNivel)

        if(statusId){
            let resultadoDadosNivel = await nivelDAO.updateNivel(dadosNivel)

            if(resultadoDadosNivel){

                let dadosNiveisJSON = {}

                dadosNiveisJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosNiveisJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosNiveisJSON.nivel = dadosNivel

                return dadosNiveisJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

// Deleta um nível
const deletarNivel = async function(idNivel){
    if(idNivel == '' || idNivel == undefined || isNaN(idNivel)){

        return message.ERROR_INVALID_ID
    } else {
        let statusId = nivelDAO.selectNivelById(idNivel)

        if(statusId){
            let resultadoDadosNivel = await nivelDAO.deleteNivel(idNivel)

            if(resultadoDadosNivel){
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
    inserirNivel,
    atualizarNivel,
    deletarNivel,
    getNiveis,
    getNivelByID
}
