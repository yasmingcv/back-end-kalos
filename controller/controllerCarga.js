/**********************************************************************
 * Objetivo: Arquivo de controle dos dados das cargas em nosso sistema
 * Data: 18/10/23
 * Autores: Artur Alves
 * Versão: 1.0
 ***********************************************************************/

var cargaDAO = require('../model/DAO/cargaDAO.js')

var message = require('./modulo/config.js') 

// Retorna o histórico de cargas do aluno naquele exercício
const getCargaByIdAlunoAndIdExercicioSerieRepeticao = async function(idAluno, idExercicioSerieRepeticao){

    let dadosCargaJSON = {}

    if(
        idAluno == '' || idAluno == undefined || isNaN(idAluno) ||
        idExercicioSerieRepeticao == '' || idExercicioSerieRepeticao == undefined || isNaN(idExercicioSerieRepeticao)
    ){
        return message.ERROR_INVALID_ID
    } else {

        let dadosCarga = await cargaDAO.selectAllCargasByIdAlunoAndIdExercicioSerieRepeticao(idAluno, idExercicioSerieRepeticao)

        if(dadosCarga){

            dadosCargaJSON.status = message.SUCCESS_REQUEST.status
            dadosCargaJSON.message = message.SUCCESS_REQUEST.message
            dadosCargaJSON.quantidade = dadosCarga.length
            dadosCargaJSON.cargas = dadosCarga

            return dadosCargaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

// Retorna uma carga pelo ID
const getCargaByID = async function(idCarga){

    let dadosCargaJSON = {}

    let dadosCarga = await cargaDAO.selectCargaById(idCarga)

    if(dadosCarga){

        dadosCargaJSON.status = message.SUCCESS_REQUEST.status
        dadosCargaJSON.message = message.SUCCESS_REQUEST.message
        dadosCargaJSON.carga = dadosCarga

        return dadosCargaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

// Insere uma nova carga
const inserirCarga = async function(dadosCarga){

    if( 
        dadosCarga.peso == '' || dadosCarga.peso == undefined || dadosCarga.peso.length > 5
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosCarga = await cargaDAO.insertCarga(dadosCarga)

        if(resultadoDadosCarga){

            let novaCarga = await cargaDAO.selectLastId()

            let dadosCargaJSON = {}

            dadosCargaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosCargaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosCargaJSON.carga = novaCarga[0]

            return dadosCargaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

// Atualiza os dados de uma carga
const atualizarCarga = async function(dadosCarga, idCarga){

    if(
        dadosCarga.peso == '' || dadosCarga.peso == undefined || dadosCarga.peso.length > 5 
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCarga == '' || idCarga == undefined || isNaN(idCarga)){

        return message.ERROR_INVALID_ID
    } else {

        dadosCarga.id = idCarga

        let statusId = await cargaDAO.selectCargaById(idCarga)

        if(statusId){
            let resultadoDadosCarga = await cargaDAO.updateCarga(dadosCarga)

            if(resultadoDadosCarga){

                let dadosCargaJSON = {}

                dadosCargaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosCargaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosCargaJSON.carga = dadosCarga

                return dadosCargaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }

}

// Deleta uma carga
const deletarCarga = async function (idCarga){

    if(idCarga == '' || idCarga == undefined || isNaN(idCarga)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await cargaDAO.selectCargaById(idCarga)

        if(statusId){

            let resultadoCarga = await cargaDAO.deleteCarga(idCarga)

            if(resultadoCarga){
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
    getCargaByID,
    getCargaByIdAlunoAndIdExercicioSerieRepeticao,
    inserirCarga,
    atualizarCarga,
    deletarCarga
}