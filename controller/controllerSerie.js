/******
 * Objetivo: Arquivo de controle dos dados de series em nosso sistema
 * Data: 20/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var serieDAO = require('../model/DAO/serieDAO.js')

var message = require('./modulo/config.js')

// Retorna todas as series
const getSeries = async function(){

    let dadosSeriesJSON = {}

    let dadosSeries = await serieDAO.selectAllSeries()

    if(dadosSeries){
        dadosSeriesJSON.status = message.SUCCESS_REQUEST.status
        dadosSeriesJSON.message = message.SUCCESS_REQUEST.message
        dadosSeriesJSON.quantidade = dadosSeries.length
        dadosSeriesJSON.series = dadosSeries

        return dadosSeriesJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getSerieByID = async function(idSerie){

    let dadosSeriesJSON = {}

    if(idSerie == '' || idSerie == undefined || isNaN(idSerie)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosSerie = await serieDAO.selectSerieByID(idSerie)

        if(dadosSerie){

            dadosSeriesJSON.status = message.SUCCESS_REQUEST.status
            dadosSeriesJSON.message = message.SUCCESS_REQUEST.message
            dadosSeriesJSON.serie = dadosSerie

            return dadosSeriesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

const inserirSerie = async function(dadosSerie){

    if(dadosSerie.numero == '' || dadosSerie.numero == undefined){

        return message.ERROR_REQUIRED_FIELDS
    } else {

        let reusltadoDadosSerie = await serieDAO.insertSerie(dadosSerie)

        if(reusltadoDadosSerie){

            let novaSerie = await serieDAO.selectLastId()

            let dadosSerieJSON = {}

            dadosSerieJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosSerieJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosSerieJSON.serie = novaSerie[0]

            return dadosSerieJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

// Atualiza uma serie

const atualizarSerie = async function(dadosSerie, idSerie){

    if(dadosSerie.numero == '' || dadosSerie.numero == undefined){

        return message.ERROR_REQUIRED_FIELDS
    } else if(idSerie == '' || idSerie == undefined || isNaN(idSerie)){

        return message.ERROR_INVALID_ID
    } else {
        dadosSerie.id = idSerie

        let statusId = await serieDAO.selectSerieByID(idSerie)

        if(statusId){
            let resultadoSerie = await serieDAO.updateSerie(dadosSerie)

            if(resultadoSerie){

                let dadosSerieJSON = {}

                dadosSerieJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosSerieJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosSerieJSON.serie = dadosSerie

                return dadosSerieJSON
            }
        }
    }
}

// Deleta uma serie
const deletarSerie = async function(idSerie){

    if(idSerie == '' || idSerie == undefined || isNaN(idSerie)){

        return message.ERROR_INVALID_ID
    } else {

        let statusId = serieDAO.selectSerieByID(idSerie)

        if(statusId){
            let resultadoSerie = await serieDAO.deleteSerie(idSerie)

            if(resultadoSerie){
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
    inserirSerie,
    atualizarSerie,
    deletarSerie,
    getSerieByID,
    getSeries
}