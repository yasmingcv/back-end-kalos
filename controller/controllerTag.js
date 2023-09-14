/**********************************************************************
 * Objetivo: Arquivo de controle dos dados das tags em nosso sistema
 * Data: 14/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var tagDAO = require('../model/DAO/tagDAO.js')
var message = require('./modulo/config.js')

// Retorna todas as tags
const getTags = async function(){

    let dadosTagsJSON = {}

    let dadosTag = await tagDAO.selectAllTags()

    if(dadosTag){
        dadosTagsJSON.status = message.SUCCESS_REQUEST.status
        dadosTagsJSON.message = message.SUCCESS_REQUEST.message
        dadosTagsJSON.quantidade = dadosTag.length
        dadosTagsJSON.tags = dadosTag

        return dadosTagsJSON
    } else{
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {getTags}