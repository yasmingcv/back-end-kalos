/**********************************************************************
 * Objetivo: Arquivo de controle dos dados dos reservas em nosso sistema
 * Data: 10/11/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var reservaDAO = require('../model/DAO/reservaDAO')
var message = require('./modulo/config.js')

// Filtra as reservas por id do aluno e id da academia
const getReservasByIdAlunoIdAcademia = async function (idAcademia, idAluno) {

    console.log(idAcademia, idAluno);
    let dadosReservasJSON = {}

    if (idAcademia == '' || idAcademia == undefined || isNaN(idAcademia) || idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosReservas = await reservaDAO.selectReservasByIdAlunoAndIdAcademia(idAluno, idAcademia)

        if (dadosReservas) {

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


const inserirReserva = async function (dadosReserva) {
    console.log(dadosReserva);
    console.log('bateu');
    if (dadosReserva.quantidade == null || dadosReserva.quantidade == undefined || dadosReserva.quantidade == ''  ||
        dadosReserva.total == null || dadosReserva.total == undefined || dadosReserva.total == '' ||
        dadosReserva.id_produto == '' || dadosReserva.id_produto == undefined || isNaN(dadosReserva.id_produto) ||
        dadosReserva.id_aluno == '' || dadosReserva.id_aluno == undefined || isNaN(dadosReserva.id_aluno) ||
        dadosReserva.id_status_reserva == '' || dadosReserva.id_status_reserva == undefined || isNaN(dadosReserva.id_status_reserva)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let rsDadosReserva = await reservaDAO.insertReserva(dadosReserva)

        if (rsDadosReserva) {
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

const atualizarReserva = async function (dadosReserva, idReserva) {

    console.log(dadosReserva, idReserva);
    if (dadosReserva.quantidade == null || dadosReserva.quantidade == undefined || dadosReserva.quantidade == '' || 
        dadosReserva.total == null || dadosReserva.total == undefined || dadosReserva.total == '' ||
        dadosReserva.id_produto == '' || dadosReserva.id_produto == undefined || isNaN(dadosReserva.id_produto) ||
        dadosReserva.id_aluno == '' || dadosReserva.id_aluno == undefined || isNaN(dadosReserva.id_aluno) ||
        dadosReserva.id_status_reserva == '' || dadosReserva.id_status_reserva == undefined || isNaN(dadosReserva.id_status_reserva) ||
        idReserva == null || idReserva == undefined || isNaN(idReserva)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let rsReserva = await reservaDAO.selectReservaById(idReserva)

        if (rsReserva) {
            let rsDadosReserva = await reservaDAO.updateReserva(dadosReserva, idReserva)

            if (rsDadosReserva) {
                let novaReserva = await reservaDAO.selectLastId()

                let dadosReservaJSON = {}

                dadosReservaJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosReservaJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosReservaJSON.reserva = novaReserva[0]

                return dadosReservaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

const getReservaById = async function (idReserva) {

    let dadosReservaJSON = {}

    if (idReserva == '' || idReserva == undefined || isNaN(idReserva)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosReserva = await reservaDAO.selectReservaById(idReserva)

        if (dadosReserva) {

            dadosReservaJSON.status = message.SUCCESS_REQUEST.status
            dadosReservaJSON.message = message.SUCCESS_REQUEST.message
            dadosReservaJSON.reserva = dadosReserva
            return dadosReservaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarReserva = async function (idReserva) {

    if (idReserva == '' || idReserva == undefined || isNaN(idReserva)) {
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await reservaDAO.selectReservaById(idReserva)

        if (statusId) {

            let resultReserva = await reservaDAO.deleteReserva(idReserva)

            if (resultReserva) {
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
    getReservasByIdAlunoIdAcademia,
    inserirReserva,
    atualizarReserva,
    getReservaById,
    deletarReserva
}