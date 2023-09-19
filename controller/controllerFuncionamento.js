/*******************************************************************************
 * Objetivo: Arquivo de controle dos dados dos funcionamentos em nosso sistema
 * Data: 18/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 *******************************************************************************/

var message = require('./modulo/config.js')
var funcionamentoDAO = require('../model/DAO/funcionamentoDAO.js')

const getFuncionamentos = async function (){
    let dadosFuncionamentosJSON = {}

    let dadosFuncionamento = await funcionamentoDAO.selectAllFuncionamentos()

    if(dadosFuncionamento){
        dadosFuncionamentosJSON.status = message.SUCCESS_REQUEST.status
        dadosFuncionamentosJSON.message = message.SUCCESS_REQUEST.message
        dadosFuncionamentosJSON.quantidade = dadosFuncionamento.length
        dadosFuncionamentosJSON.funcionamentos = dadosFuncionamento

        return dadosFuncionamentosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getFuncionamentoByIdAcademia = async function (id){
    let dadosFuncionamentoJSON = {}

    if(id == '' || id == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosFuncionamento = await funcionamentoDAO.selectFuncionamentoByIdAcademia(id)

        if(dadosFuncionamento){

            dadosFuncionamentoJSON.status = message.SUCCESS_REQUEST.status
            dadosFuncionamentoJSON.message = message.SUCCESS_REQUEST.message
            dadosFuncionamentoJSON.funcionamento = dadosFuncionamento

            return dadosFuncionamentoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertFuncionamento = async function (dadosFuncionamento){

    //Controla o uso de aspas, se chegar null não usa aspas, mas se chegar diferente de null adiciona aspas,
    //pois quando não é null precisa de aspas no SQL
    let diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

    diasSemana.forEach(dia => {
        if(dadosFuncionamento[dia].horario_inicio != null){
            dadosFuncionamento[dia].horario_inicio = "'" + dadosFuncionamento[dia].horario_inicio + "'"
        } 
        
        if (dadosFuncionamento[dia].horario_fim != null) {
            dadosFuncionamento[dia].horario_fim = "'" + dadosFuncionamento[dia].horario_fim + "'"
        }


    })

    // if( dadosFuncionamento.status == '' || dadosFuncionamento.status == undefined || isNaN(dadosFuncionamento.status) || dadosFuncionamento.status >= 3 ||
    //     dadosFuncionamento.horario_inicio == '' ||
    //     dadosFuncionamento.horario_fim == '' ||
    //     dadosFuncionamento.id_academia == '' || dadosFuncionamento.id_academia == undefined || isNaN(dadosFuncionamento.id_academia) ||
    //     dadosFuncionamento.id_dia_semana == '' || dadosFuncionamento.id_dia_semana == undefined || isNaN(dadosFuncionamento.id_dia_semana)
    // ){
    //     return message.ERROR_REQUIRED_FIELDS

    // } else{
        let resultDadosFuncionamento = await funcionamentoDAO.insertFuncionamento(dadosFuncionamento)

        if(resultDadosFuncionamento){

            let novoFuncionamento = await funcionamentoDAO.selectFuncionamentoByIdAcademia(dadosFuncionamento.id_academia)

            let dadosFuncionamentoJSON = {}

            dadosFuncionamentoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosFuncionamentoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosFuncionamentoJSON.funcionamento = novoFuncionamento

            return dadosFuncionamentoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
   // }
}

module.exports = {
    getFuncionamentos,
    getFuncionamentoByIdAcademia,
    insertFuncionamento
}