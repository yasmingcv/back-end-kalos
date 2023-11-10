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

    console.log(dadosAlunoTreino.id_treino_nivel_categoria)
    if( dadosAlunoTreino.id_aluno == '' || dadosAlunoTreino.id_aluno == undefined || isNaN(dadosAlunoTreino.id_aluno) || 
        dadosAlunoTreino.id_treino_nivel_categoria == '' || dadosAlunoTreino.id_treino_nivel_categoria == undefined
      )
        {
            return message.ERROR_INVALID_ID
        } else {
            let verificacao = await alunoTreinoDAO.verifyAlunoTreino(dadosAlunoTreino.id_aluno, dadosAlunoTreino.treinos)

            if(verificacao == false){
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
        } else {
            return message.ERROR_ALREADY_EXISTS_ID
        }
        }

}

const inserirTreinoAluno = async function (dadosAlunoTreino){
    console.log(dadosAlunoTreino.alunos);
    console.log(dadosAlunoTreino.id_treino_nivel_categoria);
    if(
        dadosAlunoTreino.id_aluno == '' || dadosAlunoTreino.alunos == undefined ||
        dadosAlunoTreino.id_treino_nivel_categoria == undefined || dadosAlunoTreino.id_treino_nivel_categoria == '' || isNaN(dadosAlunoTreino.id_treino_nivel_categoria)
    ) {
        return message.ERROR_INVALID_ID
    } else {
        console.log("teste")
        let verificacao = await alunoTreinoDAO.verifyAlunoTreino(dadosAlunoTreino.id_aluno, dadosAlunoTreino.id_treino_nivel_categoria)
        
        if(verificacao == false){
            let resultadoDadosAlunoTreino = await alunoTreinoDAO.insertTreinoAluno(dadosAlunoTreino)

            if(resultadoDadosAlunoTreino){

                let dadosAlunoTreinoJSON = {}

                dadosAlunoTreinoJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosAlunoTreinoJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosAlunoTreinoJSON.aluno_treino = dadosAlunoTreino

                return dadosAlunoTreinoJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ALREADY_EXISTS_ID
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
    deletarAlunoTreino,
    inserirTreinoAluno
}