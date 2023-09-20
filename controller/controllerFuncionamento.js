/*******************************************************************************
 * Objetivo: Arquivo de controle dos dados dos funcionamentos em nosso sistema
 * Data: 18/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 *******************************************************************************/

var message = require('./modulo/config.js')
var funcionamentoDAO = require('../model/DAO/funcionamentoDAO.js')

const getFuncionamentos = async function () {
    let dadosFuncionamentosJSON = {}

    let dadosFuncionamento = await funcionamentoDAO.selectAllFuncionamentos()

    if (dadosFuncionamento) {
        dadosFuncionamentosJSON.status = message.SUCCESS_REQUEST.status
        dadosFuncionamentosJSON.message = message.SUCCESS_REQUEST.message
        dadosFuncionamentosJSON.quantidade = dadosFuncionamento.length
        dadosFuncionamentosJSON.funcionamentos = dadosFuncionamento

        return dadosFuncionamentosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getFuncionamentoByIdAcademia = async function (id) {
    let dadosFuncionamentoJSON = {}

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosFuncionamento = await funcionamentoDAO.selectFuncionamentoByIdAcademia(id)

        if (dadosFuncionamento) {

            dadosFuncionamentoJSON.status = message.SUCCESS_REQUEST.status
            dadosFuncionamentoJSON.message = message.SUCCESS_REQUEST.message
            dadosFuncionamentoJSON.funcionamento = dadosFuncionamento

            return dadosFuncionamentoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertFuncionamento = async function (dadosFuncionamento) {
    let funcionamentoPorIdAcademia = await funcionamentoDAO.selectFuncionamentoByIdAcademia(dadosFuncionamento.id_academia)

    //Verifica se já existe registro de funcionamento com o ID da academia informado
    if (funcionamentoPorIdAcademia) {
        return message.ERROR_EXISTING_REGISTER
    } else {
        //Controla o uso de aspas, se chegar null não usa aspas, mas se chegar diferente de null adiciona aspas,
        //pois quando não é null precisa de aspas no SQL
        let diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

        for (const dia of diasSemana) {
            if (dadosFuncionamento[dia].horario_inicio != null) {
                dadosFuncionamento[dia].horario_inicio = "'" + dadosFuncionamento[dia].horario_inicio + ":00'"
            }

            if (dadosFuncionamento[dia].horario_fim != null) {
                dadosFuncionamento[dia].horario_fim = "'" + dadosFuncionamento[dia].horario_fim + ":00'"
            }
        }


        for (const dia of diasSemana) {
            if (dadosFuncionamento[dia].status == '' || dadosFuncionamento[dia].status == undefined || isNaN(dadosFuncionamento[dia].status) || dadosFuncionamento[dia].status >= 3 ||
                dadosFuncionamento[dia].horario_inicio == '' || dadosFuncionamento[dia].horario_inicio == undefined ||
                dadosFuncionamento[dia].horario_fim == '' || dadosFuncionamento[dia].horario_fim == undefined ||
                dadosFuncionamento.id_academia == '' || dadosFuncionamento.id_academia == undefined || isNaN(dadosFuncionamento.id_academia)
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                let resultDadosFuncionamento = await funcionamentoDAO.insertFuncionamento(dadosFuncionamento)

                if (resultDadosFuncionamento) {

                    let novoFuncionamento = await funcionamentoDAO.selectFuncionamentoByIdAcademia(dadosFuncionamento.id_academia)

                    let dadosFuncionamentoJSON = {}

                    dadosFuncionamentoJSON.status = message.SUCCESS_CREATE_ITEM.status
                    dadosFuncionamentoJSON.message = message.SUCCESS_CREATE_ITEM.message
                    dadosFuncionamentoJSON.funcionamento = novoFuncionamento

                    return dadosFuncionamentoJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER //500
                }
            }
        }
    }
}

const updateFuncionamento = async function (dadosFuncionamento, idAcademia) {
    dadosFuncionamento.id_academia = idAcademia

    let funcionamentoPorIdAcademia = await funcionamentoDAO.selectFuncionamentoByIdAcademia(dadosFuncionamento.id_academia)

    //Verifica se já existe registro de funcionamento com o ID da academia informado
    if (!funcionamentoPorIdAcademia) {
        return message.ERROR_ID_NOT_FOUND
    } else {
        //Controla o uso de aspas, se chegar null não usa aspas, mas se chegar diferente de null adiciona aspas,
        //pois quando não é null precisa de aspas no SQL
        let diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

        for (const dia of diasSemana) {
            if (dadosFuncionamento[dia].horario_inicio != null) {
                dadosFuncionamento[dia].horario_inicio = "'" + dadosFuncionamento[dia].horario_inicio + ":00'"
            }

            if (dadosFuncionamento[dia].horario_fim != null) {
                dadosFuncionamento[dia].horario_fim = "'" + dadosFuncionamento[dia].horario_fim + ":00'"
            }
        }


        for (const dia of diasSemana) {
            if (dadosFuncionamento[dia].status == '' || dadosFuncionamento[dia].status == undefined || isNaN(dadosFuncionamento[dia].status) || dadosFuncionamento[dia].status >= 3 ||
                dadosFuncionamento[dia].horario_inicio == '' || dadosFuncionamento[dia].horario_inicio == undefined ||
                dadosFuncionamento[dia].horario_fim == '' || dadosFuncionamento[dia].horario_fim == undefined ||
                dadosFuncionamento.id_academia == '' || dadosFuncionamento.id_academia == undefined || isNaN(dadosFuncionamento.id_academia)
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                let resultDadosFuncionamento = await funcionamentoDAO.updateFuncionamento(dadosFuncionamento)

                if (resultDadosFuncionamento) {

                    let funcionamentoAtualizado = await funcionamentoDAO.selectFuncionamentoByIdAcademia(dadosFuncionamento.id_academia)

                    let dadosFuncionamentoJSON = {}

                    dadosFuncionamentoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                    dadosFuncionamentoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                    dadosFuncionamentoJSON.funcionamento = funcionamentoAtualizado

                    return dadosFuncionamentoJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER //500
                }
            }
        }
    }
}

const deletarFuncionamento = async function(idAcademia){

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await funcionamentoDAO.selectFuncionamentoByIdAcademia(idAcademia)

        if(statusId){

            let rsFuncionamento = await funcionamentoDAO.deleteFuncionamentoByIdAcademia(idAcademia)

            if(rsFuncionamento){
                return message.SUCCESS_DELETE_ITEM
            } else{
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}


module.exports = {
    getFuncionamentos,
    getFuncionamentoByIdAcademia,
    insertFuncionamento,
    updateFuncionamento,
    deletarFuncionamento
}