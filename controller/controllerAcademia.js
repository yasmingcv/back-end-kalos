/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de academias
 * Data: 05/09/2023
 * Autores: Yasmin Gonçalves e Artur Alves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

var academiaDAO = require('../model/DAO/academiaDAO.js')

const getAcademias = async function(){

    let dadosAcademiasJSON = {}

    let dadosAcademia = await academiaDAO.selectAllAcademias()

    if(dadosAcademia){
        dadosAcademiasJSON.status = message.SUCCESS_REQUEST.status
        dadosAcademiasJSON.message = message.SUCCESS_REQUEST.message
        dadosAcademiasJSON.quantidade = dadosAcademia.length
        dadosAcademiasJSON.academias = dadosAcademia

        return dadosAcademiasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getAcademiaById = async function (idAcademia){

    let dadosAcademiasJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAcademia = await academiaDAO.selectAcademiaById(idAcademia)

        if(dadosAcademia){

            dadosAcademiasJSON.status = message.SUCCESS_REQUEST.status
            dadosAcademiasJSON.message = message.SUCCESS_REQUEST.message
            dadosAcademiasJSON.academia = dadosAcademia

            return dadosAcademiasJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getAcademiaByName = async function(nomeAcademia){
    let dadosAcademiasJSON = {}

    if(nomeAcademia == '' || nomeAcademia == undefined || !isNaN(nomeAcademia)){
        return message.ERROR_INVALID_NAME
    } else {

        let dadosAcademia = await academiaDAO.selectAcademiaByName(nomeAcademia)

        if(dadosAcademia){

            dadosAcademiasJSON.status = message.SUCCESS_REQUEST.status
            dadosAcademiasJSON.message = message.SUCCESS_REQUEST.message
            dadosAcademiasJSON.academias = dadosAcademia

            return dadosAcademiasJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}
const getAcademiaByEmail = async function(emailAcademia){
    let dadosAcademiaJSON = {}

    if(emailAcademia == '' || emailAcademia == undefined || emailAcademia.length > 250){
        return message.ERROR_INVALID_EMAIL
    } else {

        let dadosAcademia = await academiaDAO.selectAcademiaByEmail(emailAcademia)

        if(dadosAcademia){

            dadosAcademiaJSON.status = message.SUCCESS_REQUEST.status
            dadosAcademiaJSON.message = message.SUCCESS_REQUEST.message
            dadosAcademiaJSON.aluno = dadosAcademia

            return dadosAcademiaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}
const inserirAcademia = async function(dadosAcademia){

    //Verifica se o atributo veio undefined ou se não foi digitado, se sim, define como "null",
    //se não, adiciona aspas. No DAO, o atributo não contém aspas ao ser inserido, pois pode ser nulo, e se for nulo, não vai aspas.
    // if(dadosAcademia.facebook == undefined || dadosAcademia.facebook == ''){
    //     dadosAcademia.facebook = null
    // } else {
    //     dadosAcademia.facebook = "'" + dadosAcademia.facebook + "'"
    // }

    // if(dadosAcademia.whatsapp == undefined || dadosAcademia.whatsapp == ''){
    //     dadosAcademia.whatsapp = null
    // } else {
    //     dadosAcademia.whatsapp = "'" + dadosAcademia.whatsapp + "'"
    // }

    // if(dadosAcademia.instagram == undefined || dadosAcademia.instagram == ''){
    //     dadosAcademia.instagram = null
    // } else {
    //     dadosAcademia.instagram = "'" + dadosAcademia.instagram + "'"
    // }

    // Validação para tratar campos obrigatórios e caracteres

    //if( dadosAcademia.nome == '' || dadosAcademia == undefined || !isNaN(dadosAcademia.nome ||
    //    dadosAcademia.email == '' || dadosAcademia.email == undefined || dadosAcademia.email.length > 250 ||
    //    dadosAcademia.senha == '' || dadosAcademia.senha == undefined || dadosAcademia.senha.length < 12 ||
    //    dadosAcademia.telefone == '' || dadosAcademia.telefone == undefined || dadosAcademia.telefone.length > 11 ||
    //    dadosAcademia.cpnj == '' || dadosAcademia.cpnj == undefined || dadosAcademia.cpnj.length > 14 ||
    //    dadosAcademia.foto == '' || dadosAcademia.foto == undefined ||
    //    dadosAcademia.descricao == '' || dadosAcademia.descricao == undefined ||
    //    dadosAcademia.cor_primaria == '' || dadosAcademia.cor_primaria == undefined ||
    //    dadosAcademia.cor_secundaria == '' || dadosAcademia.cor_secundaria == undefined ||
    //    dadosAcademia.data_abertura == '' || dadosAcademia.data_abertura == undefined ||
    //    dadosAcademia.razao_social == '' || dadosAcademia.razao_social == undefined || !isNaN(dadosAcademia.razao_social)
    //    )){
    //        return message.ERROR_REQUIRED_FIELDS
    //    } else {

            let resultadoDadosAcademia = await academiaDAO.insertAcademia(dadosAcademia)


            if(resultadoDadosAcademia){
                let novaAcademia = await academiaDAO.selectLastId()

                let dadosAcademiaJSON = {}

                dadosAcademiaJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosAcademiaJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosAcademiaJSON.academia = novaAcademia

                return dadosAcademiaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
       // }
}

const atualizarAcademia = async function (dadosAcademia, idAcademia){

    //Verifica se o atributo veio undefined ou se não foi digitado, se sim, define como "null",
    //se não, adiciona aspas. No DAO, o atributo não contém aspas ao ser inserido, pois pode ser nulo, e se for nulo, não vai aspas.
    if(dadosAcademia.facebook == undefined || dadosAcademia.facebook == ''){
        dadosAcademia.facebook = null
    } else {
        dadosAcademia.facebook = "'" + dadosAcademia.facebook + "'"
    }

    if(dadosAcademia.whatsapp == undefined || dadosAcademia.whatsapp == ''){
        dadosAcademia.whatsapp = null
    } else {
        dadosAcademia.whatsapp = "'" + dadosAcademia.whatsapp + "'"
    }

    if(dadosAcademia.instagram == undefined || dadosAcademia.instagram == ''){
        dadosAcademia.instagram = null
    } else {
        dadosAcademia.instagram = "'" + dadosAcademia.instagram + "'"
    }

    // Validação para tratar campos obrigatórios e caracteres

    if( dadosAcademia.nome == '' || dadosAcademia == undefined || !isNaN(dadosAcademia.nome ||
        dadosAcademia.email == '' || dadosAcademia.email == undefined || dadosAcademia.email.length > 250 ||
        dadosAcademia.senha == '' || dadosAcademia.senha == undefined || dadosAcademia.senha.length < 12 ||
        dadosAcademia.telefone == '' || dadosAcademia.telefone == undefined || dadosAcademia.telefone.length > 11 ||
        dadosAcademia.cpnj == '' || dadosAcademia.cpnj == undefined || dadosAcademia.cpnj.length > 14 ||
        dadosAcademia.foto == '' || dadosAcademia.foto == undefined ||
        dadosAcademia.descricao == '' || dadosAcademia.descricao == undefined ||
        dadosAcademia.cor_primaria == '' || dadosAcademia.cor_primaria == undefined ||
        dadosAcademia.cor_secundaria == '' || dadosAcademia.cor_secundaria == undefined ||
        dadosAcademia.data_abertura == '' || dadosAcademia.data_abertura == undefined ||
        dadosAcademia.razao_social == '' || dadosAcademia.razao_social == undefined || !isNaN(dadosAcademia.razao_social)
        )){

            return message.ERROR_REQUIRED_FIELDS

        } else if (idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){

            return message.ERROR_INVALID_ID

        } else {
            dadosAcademia.id = idAcademia

            let statusId = await academiaDAO.selectAcademiaById(idAcademia)

            if(statusId){
                let resultadoDadosAcademia = await academiaDAO.updateAcademia(dadosAcademia)

                if(resultadoDadosAcademia){
                    let dadosAcademiaJSON = {}

                    dadosAcademiaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                    dadosAcademiaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                    dadosAcademiaJSON.academia = dadosAcademia

                    return dadosAcademiaJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            } else {
                return message.ERROR_ID_NOT_FOUND
            }
        }
}

const deletarAcademia = async function (idAcademia){

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await academiaDAO.selectAcademiaById(idAcademia)

        if(statusId){

            let resultadoDadosAcademia = await academiaDAO.deleteAcademia(idAcademia)

            if(resultadoDadosAcademia){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}
const autenticarAcademia = async function(dadosAcademia){
    const dados = await academiaDAO.selectAcademiaByPassword(dadosAcademia)
   
    const jwt = require('../middleware/jwtAcademia.js')

    if(dados){
        let tokenUser = await jwt.createJWT(dados.id)
        dados[0].token = tokenUser

        return dados[0]

    } else {
        return message.ERROR_UNAUTHORIZED   
    }
}


module.exports = {
    autenticarAcademia,
    getAcademiaById,
    getAcademias,
    getAcademiaByName,
    inserirAcademia,
    atualizarAcademia,
    deletarAcademia,
    getAcademiaByEmail
}
