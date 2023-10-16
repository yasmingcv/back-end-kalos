/*****************************************************************************************************
 * Objetivo: Arquivo de controle dos dados de notificações no sistema
 * Data: 10/10/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ********************************************************************************************************/

var notificacaoDAO = require('../model/DAO/notificacoesDAO')

var message = require('./modulo/config.js')


const getNotificacoesPorIdAcademia = async function (idAcademia) {

    if (!idAcademia || isNaN(idAcademia) || idAcademia == 0 || idAcademia == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosNotificacoesJSON = {}

        let dadosNotificacoes = await notificacaoDAO.selectNotificacoesByIdAcademia(idAcademia)

        if (dadosNotificacoes) {
            dadosNotificacoesJSON.status = message.SUCCESS_REQUEST.status
            dadosNotificacoesJSON.message = message.SUCCESS_REQUEST.message
            dadosNotificacoesJSON.quantidade = dadosNotificacoes.length
            dadosNotificacoesJSON.notificacoes = dadosNotificacoes

            return dadosNotificacoesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const inserirNotificacao = async function (dadosNotificacao) {
    if (dadosNotificacao.texto == undefined || dadosNotificacao.texto == '' ||
        dadosNotificacao.id_academia == undefined || dadosNotificacao.id_academia == '' || isNaN(dadosNotificacao.id_academia)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDadosNotificacao = await notificacaoDAO.insertNotificacao(dadosNotificacao)

        if(resultDadosNotificacao){
            let notificacaoJSON = {}

            notificacaoJSON.status = message.SUCCESS_CREATE_ITEM.status
            notificacaoJSON.message = message.SUCCESS_CREATE_ITEM.message
            notificacaoJSON.notificacao = resultDadosNotificacao

            return notificacaoJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const deleNotificacao = async function (idNotificacao) {
    if (!idNotificacao || isNaN(idNotificacao) || idNotificacao == 0 || idNotificacao == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let resultStatus = await notificacaoDAO.deleteNotificacao(idNotificacao)

        if(resultStatus) {
            return message.SUCCESS_DELETE_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    getNotificacoesPorIdAcademia,
    inserirNotificacao,
    deleNotificacao
}