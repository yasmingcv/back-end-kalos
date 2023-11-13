/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos reservas em nosso sistema
 * Data: 10/11/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var reservaDAO = require('../model/DAO/reservaDAO')
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

const inserirReserva = async function(dadosReserva){
    // quantidade, 
    // codigo, ------------ criar automaticamente SE VIRA
    // total, 
    // id_produto, 
    // id_aluno, 
    // id_status_reserva

    if(dadosReserva.quantidade == null || dadosReserva.quantidade == undefined || dadosReserva.quantidade == '' || !isNaN(dadosReserva.quantidade) ||
       dadosReserva.total == null || dadosReserva.total == undefined || dadosReserva.total == '' || !isNaN(dadosReserva.total) //parei aqui

    ){
        
    }
}

// if(dadosPostagem.anexo != null){
//     dadosPostagem.anexo  = `'${dadosPostagem.anexo}'`
// }

// // validacao de campos obrigatorios
// if( dadosPostagem.titulo == '' || dadosPostagem.titulo == undefined || dadosPostagem.titulo > 45 ||
//     dadosPostagem.corpo == '' || dadosPostagem.corpo == undefined || dadosPostagem.length > 500 
// ){
//     return message.ERROR_REQUIRED_FIELDS
// } else {

//     let resultadoDadosPostagem = await postagemDAO.insertPostagem(dadosPostagem)

//     if(resultadoDadosPostagem){

//         let novaPostagem = await postagemDAO.selectLastId()

//         let dadosPostagemJSON = {}

//         dadosPostagemJSON.status = message.SUCCESS_CREATE_ITEM.status
//         dadosPostagemJSON.message = message.SUCCESS_CREATE_ITEM.message
//         dadosPostagemJSON.postagem = novaPostagem[0]

//         return dadosPostagemJSON
//     } else {
//         return message.ERROR_INTERNAL_SERVER
//     }
// }