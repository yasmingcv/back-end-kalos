/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de academias
 * Data: 05/09/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')


var academiaDAO = require('../model/DAO/academiaDAO.js')

const autenticarAcademia = async function(dadosAcademia){
    const dadosAcademia = await academiaDAO.selectAcademiaByPassword(dadosAcademia)
}