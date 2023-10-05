/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela treino_nivel_categoria em nosso sistema
 * Data: 04/10/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var treinoNivelCategoriaDAO = require('../model/DAO/treinoNivelCategoriaDAO.js')
var exercicioSerieRepeticaoDAO = require('../model/DAO/exercicio_serie_repeticaoDAO.js')

var message = require('./modulo/config.js') 

const getTreinoNivelCategoriaById = async function(idTreinoNivelCategoria){

    let dadosTreinoNivelCategoriaJSON = {}

    if(idTreinoNivelCategoria == '' || idTreinoNivelCategoria == undefined || isNaN(idTreinoNivelCategoria)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosTreinoNivelCategoria = await treinoNivelCategoriaDAO.selectTreinoNivelCategoriaById(idTreinoNivelCategoria)


        if(dadosTreinoNivelCategoria){

            dadosTreinoNivelCategoriaJSON.status = message.SUCCESS_REQUEST.status
            dadosTreinoNivelCategoriaJSON.message = message.SUCCESS_REQUEST.message

            
            let exerciciosTreino = await exercicioSerieRepeticaoDAO.selectExercicioSerieRepeticaoByIDTreinoNivelCategoria(dadosTreinoNivelCategoria.id)
            dadosTreinoNivelCategoria.exercicios = exerciciosTreino
               
            dadosTreinoNivelCategoriaJSON.informacoes = dadosTreinoNivelCategoria
            


            return dadosTreinoNivelCategoriaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    } 
}

const getTreinoNivelCategoriaByIdAcademia = async function(idAcademia){

    let dadosTreinoNivelCategoriaJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosTreinoNivelCategoria = await treinoNivelCategoriaDAO.selectTreinoNivelCategoriaByIdAcademia(idAcademia)
        console.log(dadosTreinoNivelCategoria);

        if(dadosTreinoNivelCategoria){

            dadosTreinoNivelCategoriaJSON.status = message.SUCCESS_REQUEST.status
            dadosTreinoNivelCategoriaJSON.message = message.SUCCESS_REQUEST.message
               
            dadosTreinoNivelCategoriaJSON.informacoes = dadosTreinoNivelCategoria
            


            return dadosTreinoNivelCategoriaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    } 
}

module.exports = {
    getTreinoNivelCategoriaById,
    getTreinoNivelCategoriaByIdAcademia
}