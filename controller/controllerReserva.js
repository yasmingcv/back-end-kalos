/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos reservas em nosso sistema
 * Data: 10/11/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var reservaDAO = require('../model/DAO/reservaDAO')
var message = require('./modulo/config.js') 

// Retorna todas as postagens de uma academia
const getReservasByIdAlunoIdAcademia = async function(idAcademia, idAluno){

    let dadosReservasJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia) || idAluno == '' || idAluno == undefined || isNaN(idAluno)){
        return message.ERROR_INVALID_ID
    } else {

    let dadosReservas = await reservaDAO.selectReservasByIdAlunoAndIdAcademia(idAluno, idAcademia)

    if(dadosReservas){

        dadosReservasJSON.status = message.SUCCESS_REQUEST.status
        dadosReservasJSON.message = message.SUCCESS_REQUEST.message
        dadosReservasJSON.quantidade = dadosReservas.length
        dadosReservasJSON.reservas = dadosReservas

        return dadosReservasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
}


const inserirReserva = async function(dadosReserva){
    if(dadosReserva.quantidade == null || dadosReserva.quantidade == undefined || dadosReserva.quantidade == '' || !isNaN(dadosReserva.quantidade) ||
       dadosReserva.total == null || dadosReserva.total == undefined || dadosReserva.total == '' || !isNaN(dadosReserva.total) ||
       dadosReserva.id_produto == '' || dadosReserva.id_produto == undefined || isNaN(dadosReserva.id_produto) ||
       dadosReserva.id_aluno == '' || dadosReserva.id_aluno == undefined || isNaN(dadosReserva.id_aluno) ||
       dadosReserva.id_status_reserva == '' || dadosReserva.id_status_reserva == undefined || isNaN(dadosReserva.id_status_reserva) 
    ){
        return message.ERROR_REQUIRED_FIELDS
    } else  {
        let rsDadosReserva = await reservaDAO.insertReserva(dadosReserva)

        if(rsDadosReserva){
            let novaReserva = await reservaDAO.selectLastId()

            let dadosReservaJSON = {}

            dadosReservaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosReservaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosReservaJSON.reserva = novaReserva[0]

            return dadosReservaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
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

module.exports = {
    getReservasByIdAlunoIdAcademia
}