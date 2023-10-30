/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela aluno_treino em nosso sistema
 * Data: 04/10/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var alunoTreinoDAO = require('../model/DAO/alunoTreinoDAO.js')

var message = require('./modulo/config.js') 

const getAlunoTreinos = async function(){

    let dadosAlunoTreinoJSON = {}

    let dadosAlunoTreino = await alunoTreinoDAO.selectAllAlunoTreino()

    if(dadosAlunoTreino){

        dadosAlunoTreinoJSON.status = message.SUCCESS_REQUEST.status
        dadosAlunoTreinoJSON.message = message.SUCCESS_REQUEST.message
        dadosAlunoTreinoJSON.quantidade = dadosAlunoTreino.length
        dadosAlunoTreinoJSON.aluno_treinos = dadosAlunoTreino

        return dadosAlunoTreinoJSON
    } else 
        return message.ERROR_NOT_FOUND
}

const getAlunoTreinoById = async function(idAlunoTreino){

    let dadosAlunoTreinoJSON = {}

    if(idAlunoTreino == '' || idAlunoTreino == undefined || isNaN(idAlunoTreino)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAlunoTreino = await alunoTreinoDAO.selectAlunoTreinoById(idAlunoTreino)


        if(dadosAlunoTreino){

            dadosAlunoTreinoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoTreinoJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoTreinoJSON.aluno_treino = dadosAlunoTreino

            return dadosAlunoTreinoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getAlunoTreinoByIdAcademia = async function(idAcademia){

    let dadosAlunoTreinoJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAlunoTreino = await alunoTreinoDAO.selectAlunoTreinoByIdAcademia(idAcademia)

        if(dadosAlunoTreino){

            dadosAlunoTreinoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoTreinoJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoTreinoJSON.treinos_atribuidos = dadosAlunoTreino

            return dadosAlunoTreinoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const inserirAlunoTreino = async function(dadosAlunoTreino){


    if( dadosAlunoTreino.id_aluno == '' || dadosAlunoTreino.id_aluno == undefined || isNaN(dadosAlunoTreino.id_aluno) ||
        dadosAlunoTreino.id_treino_nivel_categoria == '' || dadosAlunoTreino.id_treino_nivel_categoria == undefined || isNaN(dadosAlunoTreino.id_treino_nivel_categoria) ||
        dadosAlunoTreino.id_treino_nivel_categoria.length === 0)
        {
            return message.ERROR_INVALID_ID
        } else {

            let resultadoDadosAlunoTreino = await alunoTreinoDAO.insertAlunoTreino(dadosAlunoTreino)

            if(resultadoDadosAlunoTreino){

                let dadosAlunoTreinoJSON = {}

                dadosAlunoTreinoJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosAlunoTreinoJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosAlunoTreinoJSON.aluno_treino = dadosAlunoTreino

                return dadosAlunoTreinoJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

}

const deletarAlunoTreino = async function(idAlunoTreino){

    if(idAlunoTreino == '' || idAlunoTreino == undefined || isNaN(idAlunoTreino)){
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await alunoTreinoDAO.selectAlunoTreinoById(idAlunoTreino)

        if(statusId){

            let resultadoDadosAlunoTreino = await alunoTreinoDAO.deleteAlunoTreino(idAlunoTreino)
            
            console.log(resultadoDadosAlunoTreino)
            if(resultadoDadosAlunoTreino){
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
    inserirAlunoTreino,
    getAlunoTreinoById,
    getAlunoTreinos,
    getAlunoTreinoByIdAcademia,
    deletarAlunoTreino
}