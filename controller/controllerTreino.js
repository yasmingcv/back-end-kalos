/************************************************************************************************
 * Objetivo: Arquivo de controle dos dados de um treino em nosso sistema
 * Data: 03/09/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ************************************************************************************************/

var treinoDAO = require('../model/DAO/treinoDAO.js')
var treinoNivelCategoriaDAO = require('../model/DAO/treinoNivelCategoriaDAO.js')
var controllerTreinoNIvelNivelCategoria = require('./controllerTreinoNivelCategoria.js')

var message = require('./modulo/config.js')

const getTreinos = async function () {

    let dadosTreinoJSON = {}

    let dadosTreino = await treinoDAO.selectAllTreinos()

    if (dadosTreino) {
        dadosTreinoJSON.status = message.SUCCESS_REQUEST.status
        dadosTreinoJSON.message = message.SUCCESS_REQUEST.message
        dadosTreinoJSON.quantidade = dadosTreino.length
        dadosTreinoJSON.treinos = dadosTreino

        return dadosTreinoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getTreinoByID = async function (idTreino) {

    let dadosTreinoJSON = {}

    if (idTreino == '' || idTreino == undefined || isNaN(idTreino)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosTreino = await treinoDAO.selectTreinoById(idTreino)

        if (dadosTreino) {

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


    for (const exercicio of dadosTreino.exercicios) {
        if (exercicio.duracao == undefined || exercicio.duracao == '') {
            exercicio.duracao = null
        } else {
            exercicio.duracao = `'${exercicio.duracao}'`
        }

        if (exercicio.id_repeticao == undefined || exercicio.id_repeticao == '') {
            exercicio.id_repeticao = null
        }

    }

    if (dadosTreino.nome == undefined || dadosTreino.nome == '' || dadosTreino.nome == null ||
        dadosTreino.data_criacao == undefined || dadosTreino.data_criacao == null || dadosTreino.data_criacao == '' ||
        isNaN(dadosTreino.id_nivel) || isNaN(dadosTreino.id_categoria_treino) || isNaN(dadosTreino.id_academia)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let rsTreino = await treinoDAO.insertTreino(dadosTreino)

        if (rsTreino) {
            let dadosTreinoJSON = {}
            dadosTreinoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosTreinoJSON.status = message.SUCCESS_CREATE_ITEM.status
            let idNovoTreino = await treinoNivelCategoriaDAO.selectLastId()
            let novoTreino = await controllerTreinoNIvelNivelCategoria.getTreinoNivelCategoriaById(idNovoTreino[0].id)
            dadosTreinoJSON.treino = novoTreino.informacoes

            return dadosTreinoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }
}

const atualizarTreino = async function (dadosTreino, idTreino) {
    if (
        dadosTreino.nome == '' || dadosTreino.nome == undefined ||
        dadosTreino.foto == '' || dadosTreino.foto == undefined) {
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
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}
const deletarTreino = async function (idTreino) {
    if (idTreino == '' || idTreino == undefined || isNaN(idTreino)) {
        return message.ERROR_INVALID_ID
    } else {
        let statusId = treinoDAO.selectTreinoById(idTreino)

        if (statusId) {
            let resultadoDadosTreino = await treinoDAO.deleteTreino(idTreino)
            if (resultadoDadosTreino) {
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVE
                
                R
            }
        } else {
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