/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos estados em nosso sistema
 * Data: 05/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ***********************************************************************/

var estadoDAO = require('../model/DAO/estadoDAO.js')

var message = require('./modulo/config.js')

const inserirEstado = async function(dadosEstado){

    if(dadosEstado.nome == '' || dadosEstado.nome == undefined || !isNaN(dadosEstado.nome)){
        return message.ERROR_REQUIRED_FIELDS
    } else{
        let resultadoDadosEstado = await estadoDAO.insertEstado(dadosEstado)

        if(resultadoDadosEstado){
            let dadosEstadoJSON = {}

            dadosEstadoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosEstadoJSON.message = message.SUCCESS_CREATE_ITEM.message

            return dadosEstadoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarEstado = async function(dadosEstado, idEstado){
    if(dadosEstado.nome == '' || dadosEstado.nome == undefined || !isNaN(dadosEstado.nome)){

        return message.ERROR_REQUIRED_FIELDS
    } else if(idEstado == '' || idEstado == undefined || isNaN(idEstado)){

        return message.ERROR_INVALID_ID

    } else {
        dadosEstado.id = idEstado

        let statusId = await estadoDAO.selectEstadoById(idEstado)

        if(statusId){
            let resultadoDadosEstado = await estadoDAO.updateEstado(dadosEstado)

            if(resultadoDadosEstado){
                let dadosEstadoJSON = {}

                dadosEstadoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosEstadoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosEstadoJSON.estado = dadosEstado

                return dadosEstadoJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }

}

const deletarEstado = async function(idEstado){

    if(idEstado == '' || idEstado == undefined || isNaN(idEstado)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await estadoDAO.selectEstadoById(idEstado)

        if(statusId){

            let resultadoDadosEstado = await estadoDAO.deleteEstado(idEstado)

            if(resultadoDadosEstado){
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
    inserirEstado,
    atualizarEstado,
    deletarEstado
}