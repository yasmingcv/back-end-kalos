/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela aluno_academia em nosso sistema
 * Data: 05/09/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var alunoAcademiaDAO = require('../model/DAO/aluno_academiaDAO.js')


var message = require('./modulo/config.js') 

const getAlunoAcademiaById = async function(idAlunoAcademia){

    let dadosAlunoAcademiaJSON = {}

    if(idAlunoAcademia == '' || idAlunoAcademia == undefined || isNaN(idAlunoAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAlunoAcademia = await alunoAcademiaDAO.selectAlunoAcademiaById(idAlunoAcademia)

        if(dadosAlunoAcademia){

            dadosAlunoAcademiaJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoAcademiaJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoAcademiaJSON.aluno = dadosAlunoAcademia

            return dadosAlunoAcademiaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const inserirAlunoAcademia = async function(dadosAlunoAcademia){

    if(
        dadosAlunoAcademia.id_academia == '' || dadosAlunoAcademia.id_academia == undefined || isNaN(dadosAlunoAcademia.id_academia) ||
        dadosAlunoAcademia.id_aluno == '' || dadosAlunoAcademia.id_aluno == undefined || isNaN(dadosAlunoAcademia.id_aluno)
    ){
        return message.ERROR_INVALID_ID
    } else{

        let resultadoDadosAlunoAcademia = await alunoAcademiaDAO.insertAlunoAcademia(dadosAlunoAcademia)

        
        if(resultadoDadosAlunoAcademia){

            let dadosAlunoAcademiaJSON = {}
            
            dadosAlunoAcademiaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosAlunoAcademiaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosAlunoAcademiaJSON = dadosAlunoAcademia
            
            return dadosAlunoAcademiaJSON
            
        } else{
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

const atualizarAlunoAcademia = async function(dadosAlunoAcademia, idAluno){

    if( dadosAlunoAcademia.frequencia_cardiaca == '' || dadosAlunoAcademia.frequencia_cardiaca == undefined ||
        dadosAlunoAcademia.tempo_em_pe == '' || dadosAlunoAcademia.tempo_em_pe == undefined ||
        dadosAlunoAcademia.rotina_regular == '' || dadosAlunoAcademia.rotina_regular == undefined ||
        dadosAlunoAcademia.frequencia_treino_semanal == '' || dadosAlunoAcademia.frequencia_treino_semanal == undefined || isNaN(dadosAlunoAcademia.frequencia_treino_semanal)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){

        return message.ERROR_INVALID_ID
    } else{

        dadosAlunoAcademia.id_aluno = idAluno

        let statusId = await alunoAcademiaDAO.selectAlunoAcademiaById(idAluno)

        if(statusId){
            let resultadoDadosAlunoAcademia = await alunoAcademiaDAO.updateAlunoAcademia(dadosAlunoAcademia)

            if(resultadoDadosAlunoAcademia){

                let dadosAlunoAcademiaJSON = {}

                dadosAlunoAcademiaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosAlunoAcademiaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosAlunoAcademiaJSON.aluno = dadosAlunoAcademia

                return dadosAlunoAcademia
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAlunoAcademia,
    atualizarAlunoAcademia,
    getAlunoAcademiaById
}