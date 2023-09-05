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