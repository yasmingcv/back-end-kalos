/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela aluno_academia em nosso sistema
 * Data: 05/09/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var alunoAcademiaDAO = require('../model/DAO/aluno_academiaDAO.js')
var academiaDAO = require('../model/DAO/academiaDAO.js')
var alunoDAO = require('../model/DAO/alunoDAO.js')


var message = require('./modulo/config.js') 


const getAllAlunosByIdAcademia = async function(idAcademia){
    let dadosAlunoAcademiaJSON = {}

    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAlunoAcademia = await alunoAcademiaDAO.selectAllAlunosByIdAcademia(idAcademia)

        if(dadosAlunoAcademia){

            dadosAlunoAcademiaJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoAcademiaJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoAcademiaJSON.alunos = dadosAlunoAcademia

            return dadosAlunoAcademiaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}
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

const getAcademiasAlunoByID = async function(idAluno){
    let dadosAlunoAcademiaJSON = {}

    if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){
        return message.ERROR_INVALID_ID
    } else {

        let dadosAlunoAcademia = await alunoAcademiaDAO.selectAcademiasAlunoByID(idAluno)

        if(dadosAlunoAcademia){
            
            dadosAlunoAcademiaJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoAcademiaJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoAcademiaJSON.quantidade = dadosAlunoAcademia.length

            for (const academia of dadosAlunoAcademia) {
                let tagsDasAcademiasAluno = await academiaDAO.selectAcademiaTags(academia.id)
            
                if(tagsDasAcademiasAluno == false){
                    academia.tags = []
                } else {
                    academia.tags = tagsDasAcademiasAluno
                }
                
            }

            dadosAlunoAcademiaJSON.academias = dadosAlunoAcademia

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
            dadosAlunoAcademiaJSON.aluno_academia = dadosAlunoAcademia
            

            return dadosAlunoAcademiaJSON
            
        } else{
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

const atualizarAlunoAcademia = async function( idAluno, dadosAlunoAcademia){
    console.log(dadosAlunoAcademia.frequencia_cardiaca);
    console.log(dadosAlunoAcademia.tempo_em_pe);
    console.log(dadosAlunoAcademia.rotina_regular);
    console.log(dadosAlunoAcademia.frequencia_treino_semanal);

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

                return dadosAlunoAcademiaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_ID_NOT_FOUND
        }
    }
}

const getLastAlunos = async function(idAcademia){
    let dadosAlunosJSON = {}

    let dadosAluno = await alunoAcademiaDAO.selectLast5Alunos(idAcademia)
    if(idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {
    if(dadosAluno){


        dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
        dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
        dadosAlunosJSON.ultimos_alunos = dadosAluno

        return dadosAlunosJSON
    } else 
        return message.ERROR_NOT_FOUND

    }
}

const deletarAlunoDaAcademia = async function (idAluno, idAcademia){

    if (idAluno == '' || idAluno == undefined || isNaN(idAluno) || idAcademia == '' || idAcademia == undefined || isNaN(idAcademia)){
        return message.ERROR_INVALID_ID
    } else {

        let statusAcademiaId = await academiaDAO.selectAcademiaById(idAcademia)
        let statusAlunoId = await alunoDAO.selectAlunoById(idAluno)

        if(statusAcademiaId && statusAlunoId){

            let resultadoDadosAlunoAcademia = await alunoAcademiaDAO.deleteAlunoFromAcademia(idAluno, idAcademia)

            if(resultadoDadosAlunoAcademia) {
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } 
    
}

module.exports = {
    inserirAlunoAcademia,
    atualizarAlunoAcademia,
    getAlunoAcademiaById,
    getLastAlunos,
    getAcademiasAlunoByID,
    getAllAlunosByIdAcademia,
    deletarAlunoDaAcademia
}