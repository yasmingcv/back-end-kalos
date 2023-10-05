/*****************************************************************************************************
 * Objetivo: Arquivo de controle dos dados de categorias no sistema
 * Data: 04/10/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ********************************************************************************************************/

var categoriaDAO = require('../model/DAO/categoriaDAO.js')

var message = require('./modulo/config.js')

// Retorna todas as categorias
const getCategorias = async function(){

    let dadosCategoriasJSON = {}

    let dadosCategoria = await categoriaDAO.selectAllCategorias()

    if(dadosCategoria){
        dadosCategoriasJSON.status = message.SUCCESS_REQUEST.status
        dadosCategoriasJSON.message = message.SUCCESS_REQUEST.message
        dadosCategoriasJSON.quantidade = dadosCategoria.length
        dadosCategoriasJSON.categorias = dadosCategoria

        return dadosCategoriasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    getCategorias
}