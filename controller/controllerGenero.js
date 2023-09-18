/******
 * Objetivo: Arquivo de controle dos dados do gênero em nosso sistema
 * Data: 31/08/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

var generoDAO = require('../model/DAO/generoDAO.js')

var message = require('./modulo/config.js')


const getGeneros = async function(){

    let dadosGeneroJSON = {}

    let dadosGenero = await generoDAO.selectAllGeneros()

    if(dadosGenero){
        dadosGeneroJSON.status = message.SUCCESS_REQUEST.status
        dadosGeneroJSON.message = message.SUCCESS_REQUEST.message
        dadosGeneroJSON.quantidade = dadosGenero.length
        dadosGeneroJSON.generos = dadosGenero

        return dadosGeneroJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}
const inserirGenero = async function (dadosGenero){

    // Validação para tratar campos obrigatórios
    if(dadosGenero.nome == '' || dadosGenero.nome == undefined || !isNaN(dadosGenero.nome)){
        return message.ERROR_REQUIRED_FIELDS
    } else{

        let resultadoDadosGenero = await generoDAO.insertGenero(dadosGenero)

        if(resultadoDadosGenero) {

            let dadosGeneroJSON = {}

            dadosGeneroJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosGeneroJSON.message = message.SUCCESS_CREATE_ITEM.message

            return dadosGeneroJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarGenero = async function (dadosGenero, idGenero){
    if(dadosGenero.nome == '' || dadosGenero.nome == undefined || !isNaN(dadosGenero.nome)){
        return message.ERROR_REQUIRED_FIELDS

    } else if (idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID
    } 
    else {
        dadosGenero.id = idGenero

        let statusId = await generoDAO.selectGeneroById(idGenero)

        if(statusId){
            let resultadoDadosGenero = await generoDAO.updateGenero(dadosGenero)

            if(resultadoDadosGenero){

                let dadosGeneroJSON = {}

                dadosGeneroJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosGeneroJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosGeneroJSON.genero = dadosGenero

                return dadosGeneroJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }


}

const deletarGenero = async function (idGenero){
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID
} else {
    let statusId = generoDAO.selectGeneroById(idGenero)

    if(statusId){

        let resultadoDadosGenero = await generoDAO.deleteGenero(idGenero)

        if(resultadoDadosGenero){
            return message.SUCCESS_DELETE_ITEM
        } else{
            return message.ERROR_INTERNAL_SERVER
        }
    } else{
        return message.ERROR_INVALID_ID
    }
}
}
module.exports = {
    inserirGenero,
    atualizarGenero,
    deletarGenero,
    getGeneros
}