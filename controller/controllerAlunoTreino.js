/**********************************************************************
 * Objetivo: Arquivo de controle dos dados da tabela aluno_treino em nosso sistema
 * Data: 04/10/23
 * Autores: Artur Alves e Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************/

var alunoTreinoDAO = require('../model/DAO/alunoTreinoDAO.js')

var message = require('./modulo/config.js') 

const inserirAlunoTreino = async function(dadosAlunoTreino){


    if( dadosAlunoTreino.id_aluno == '' || dadosAlunoTreino.id_aluno == undefined || isNaN(dadosAlunoTreino.id_aluno) ||
        dadosAlunoTreino.id_treino_nivel_categoria == '' || dadosAlunoTreino.id_treino_nivel_categoria == undefined || isNaN(dadosAlunoTreino.id_treino_nivel_categoria))
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

module.exports = {
    inserirAlunoTreino
}