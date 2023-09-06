/**********************************************************************
 * Objetivo: Arquivo de controle dos dados das cidades em nosso sistema
 * Data: 05/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ***********************************************************************/

var cidadeDAO = require('../model/DAO/cidadeDAO.js')

var message = require('./modulo/config.js')

const inserirCidade = async function(dadosCidade){

    if(dadosCidade.nome == '' || dadosCidade.nome == undefined || !isNaN(dadosCidade.nome)){
        return message.ERROR_REQUIRED_FIELDS
    } else{
        let resultadoDadosCidade = await cidadeDAO.insertCidade(dadosCidade)

        if(resultadoDadosCidade){
            let dadosCidadeJSON = {}

            dadosCidadeJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosCidadeJSON.message = message.SUCCESS_CREATE_ITEM.message

            return dadosCidadeJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarCidade = async function(dadosCidade, idCidade){
    if(dadosCidade.nome == '' || dadosCidade.nome == undefined || !isNaN(dadosCidade.nome)){

        return message.ERROR_REQUIRED_FIELDS

    } else if(idCidade == '' || idCidade == undefined || isNaN(idCidade)){

        return message.ERROR_INVALID_ID

    } else {
        dadosCidade.id = idCidade

        let statusId = await cidadeDAO.selectCidadeById(idCidade)

        if(statusId){
            let resultadoDadosCidade = await cidadeDAO.updateCidade(dadosCidade)

            if(resultadoDadosCidade){
                let dadosCidadeJSON = {}

                dadosCidadeJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosCidadeJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosCidadeJSON.cidade = dadosCidade

                return dadosCidadeJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

const deletarCidade = async function(idCidade){

    if(idCidade == '' || idCidade == undefined || isNaN(idCidade)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await cidadeDAO.selectCidadeById(idCidade)

        if(statusId){

            let resultadoDadosCidade = await cidadeDAO.deleteCidade(idCidade)

            if(resultadoDadosCidade){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

module.exports = {
    inserirCidade,
    atualizarCidade,
    deletarCidade
}