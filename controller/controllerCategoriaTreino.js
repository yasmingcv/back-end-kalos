/******
 * Objetivo: Arquivo de controle dos dados de categorias de treino em nosso sistema
 * Data: 19/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var categoriaTreinoDAO = require('../model/DAO/categoria_treinoDAO.js')

var message = require('./modulo/config.js')

// Retorna todas as categorias
const getCategoriasTreino = async function(){

    let dadosCategoriasJSON = {}

    let dadosCategoriaTreino = await categoriaTreinoDAO.selectAllCategoriasTreino()

    if(dadosCategoriaTreino){
        dadosCategoriasJSON.status = message.SUCCESS_REQUEST.status
        dadosCategoriasJSON.message = message.SUCCESS_REQUEST.message
        dadosCategoriasJSON.quantidade = dadosCategoriaTreino.length
        dadosCategoriasJSON.categorias = dadosCategoriaTreino

        return dadosCategoriasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

// Retorna uma categoria pelo id
const getCategoriaTreinoByID = async function(idCategoriaTreino){

    let dadosCategoriasJSON = {}

    if(idCategoriaTreino == '' || idCategoriaTreino == undefined || isNaN(idCategoriaTreino)){
        
        return message.ERROR_INVALID_ID
    } else {

        let dadosCategoriaTreino = await categoriaTreinoDAO.selectCategoriaTreinoByID(idCategoriaTreino)

        if(dadosCategoriaTreino){

        dadosCategoriasJSON.status = message.SUCCESS_REQUEST.status
        dadosCategoriasJSON.message = message.SUCCESS_REQUEST.message
        dadosCategoriasJSON.categoria = dadosCategoriaTreino

        return dadosCategoriasJSON
        } else {
            message.ERROR_NOT_FOUND
        }
    }
}

const inserirCategoriaTreino = async function (dadosCategoriaTreino){

    if(dadosCategoriaTreino.nome == '' || dadosCategoriaTreino.nome == undefined || !isNaN(dadosCategoriaTreino.nome)){

        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosCategoria = await categoriaTreinoDAO.insertCategoriaTreino(dadosCategoriaTreino)

        if(resultadoDadosCategoria){
            let novaCategoria = await categoriaTreinoDAO.selectLastId()

            let dadosCategoriasJSON = {}

            dadosCategoriasJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosCategoriasJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosCategoriasJSON.categoria = novaCategoria[0]

            return dadosCategoriasJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarCategoriaTreino = async function (dadosCategoriaTreino, idCategoriaTreino){
    if(dadosCategoriaTreino.nome == '' || dadosCategoriaTreino.nome == undefined || !isNaN(dadosCategoriaTreino)){

        return message.ERROR_REQUIRED_FIELDS
    } else if (idCategoriaTreino == '' || idCategoriaTreino == undefined || isNaN(idCategoriaTreino)){

        return message.ERROR_INVALID_ID
    } else {
        dadosCategoriaTreino.id = idCategoriaTreino

        let statusId = await categoriaTreinoDAO.selectCategoriaTreinoByID(idCategoriaTreino)

        if(statusId){
            let resultadoDadosCategoria = await categoriaTreinoDAO.updateCategoriaTreino(dadosCategoriaTreino)

            if(resultadoDadosCategoria){

                let dadosCategoriasJSON = {}

                dadosCategoriasJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosCategoriasJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosCategoriasJSON.categoria = dadosCategoriaTreino

                return dadosCategoriasJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            } 
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

// Deleta uma categoria
const deletarCategoriaTreino = async function(idCategoriaTreino){

    if(idCategoriaTreino == '' || idCategoriaTreino == undefined || isNaN(idCategoriaTreino)){

        return message.ERROR_INVALID_ID
    } else {
        let statusId = categoriaTreinoDAO.selectCategoriaTreinoByID(idCategoriaTreino)

        if(statusId){
            let resultadoDadosCategoria = await categoriaTreinoDAO.deleteCategoriaTreino(idCategoriaTreino)

            if(resultadoDadosCategoria){
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
    inserirCategoriaTreino,
    atualizarCategoriaTreino,
    deletarCategoriaTreino,
    getCategoriaTreinoByID,
    getCategoriasTreino
}