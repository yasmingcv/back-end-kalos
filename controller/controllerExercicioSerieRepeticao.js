/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela exercicio_serie_repeticao em nosso sistema
 * Data: 04/10/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var exercicioSerieRepeticaoDAO = require('../model/DAO/exercicio_serie_repeticaoDAO.js')

var message = require('./modulo/config.js') 

const getExercicioSerieRepeticaoById = async function(idESR){

    let dadosExercicioSerieRepeticaoJSON = {}

    if(idESR == '' || idESR == undefined || isNaN(idESR)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosExercicioSerieRepeticao = await exercicioSerieRepeticaoDAO.selectExercicioSerieRepeticaoByID(idESR)

        if(dadosExercicioSerieRepeticao){

            dadosExercicioSerieRepeticaoJSON.status = message.SUCCESS_REQUEST.status
            dadosExercicioSerieRepeticaoJSON.message = message.SUCCESS_REQUEST.message
            dadosExercicioSerieRepeticao.numero = null
            dadosExercicioSerieRepeticaoJSON.informacoes = dadosExercicioSerieRepeticao
            

            return dadosExercicioSerieRepeticaoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const getExercicioSerieRepeticaoByIdTreino = async function(id){

    let dadosExercicioSerieRepeticaoJSON = {}

    if(id == '' || id == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosExercicioSerieRepeticao = await exercicioSerieRepeticaoDAO.selectExercicioSerieRepeticaoByIDTreinoNivelCategoria(id)

        if(dadosExercicioSerieRepeticao){

            dadosExercicioSerieRepeticaoJSON.status = message.SUCCESS_REQUEST.status
            dadosExercicioSerieRepeticaoJSON.message = message.SUCCESS_REQUEST.message
            dadosExercicioSerieRepeticaoJSON.exercicios = dadosExercicioSerieRepeticao

            return dadosExercicioSerieRepeticaoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

module.exports = {

    getExercicioSerieRepeticaoById,
    getExercicioSerieRepeticaoByIdTreino
}