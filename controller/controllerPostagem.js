/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos alunos em nosso sistema
 * Data: 16/10/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var postagemDAO = require('../model/DAO/postagensDAO.js')

var message = require('./modulo/config.js') 

// Retorna todas as postagens de uma academia
const getPostagensByIdAcademia = async function(idAcademia){

    let dadosPostagemJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

    let dadosPostagem = await postagemDAO.selectAllPostagensByIdAcademia(idAcademia)

    if(dadosPostagem){

        dadosPostagemJSON.status = message.SUCCESS_REQUEST.status
        dadosPostagemJSON.message = message.SUCCESS_REQUEST.message
        dadosPostagemJSON.quantidade = dadosPostagem.length
        dadosPostagemJSON.postagens = dadosPostagem

        return dadosPostagemJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
}

// Retorna uma postagem pelo id
const getPostagemByID = async function(idPostagem){

    let dadosPostagemJSON = {}

    let dadosPostagem = await postagemDAO.selectPostagemById(idPostagem)

    if(dadosPostagem){

        dadosPostagemJSON.status = message.SUCCESS_REQUEST.status
        dadosPostagemJSON.message = message.SUCCESS_REQUEST.message
        dadosPostagemJSON.postagem = dadosPostagem

        return dadosPostagemJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

// Insere uma nova postagem
const inserirPostagem = async function(dadosPostagem){

    // validacao de campos obrigatorios
    if( dadosPostagem.titulo == '' || dadosPostagem.titulo == undefined || dadosPostagem.titulo > 45 ||
        dadosPostagem.corpo == '' || dadosPostagem.corpo == undefined || dadosPostagem.length > 500 
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosPostagem = await postagemDAO.insertPostagem(dadosPostagem)

        if(resultadoDadosPostagem){

            let novaPostagem = await postagemDAO.selectLastId()

            let dadosPostagemJSON = {}

            dadosPostagemJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosPostagemJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosPostagemJSON.postagem = novaPostagem[0]

            return dadosPostagemJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

// Atualiza os dados de uma postagem
const atualizarPostagem = async function(dadosPostagem, idPostagem){

    if( dadosPostagem.titulo == '' || dadosPostagem.titulo == undefined || dadosPostagem.titulo > 45 ||
        dadosPostagem.corpo == '' || dadosPostagem.corpo == undefined || dadosPostagem.length > 500 
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else if (idPostagem == '' || idPostagem == undefined || isNaN(idPostagem)){

        return message.ERROR_INVALID_ID
    } else {
        dadosPostagem.id = idPostagem

        let statusId = await postagemDAO.selectPostagemById(idPostagem)

        if(statusId){
            let resultadoDadosPostagem = await postagemDAO.updatePostagem(dadosPostagem)

            if(resultadoDadosPostagem){
                let dadosPostagemJSON = {}

                dadosPostagemJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosPostagemJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosPostagemJSON.postagem = dadosPostagem

                return dadosPostagemJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

// Deleta uma postagem
const deletarPostagem = async function(idPostagem){

    if(idPostagem == '' || idPostagem == undefined || isNaN(idPostagem)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await postagemDAO.selectPostagemById(idPostagem)

        if(statusId){

            let resultadoDadosPostagem = await postagemDAO.deletePostagem(idPostagem)

            if(resultadoDadosPostagem){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

module.exports = {
    getPostagensByIdAcademia,
    getPostagemByID,
    inserirPostagem,
    atualizarPostagem,
    deletarPostagem
}