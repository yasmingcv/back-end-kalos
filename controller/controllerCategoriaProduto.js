/******
 * Objetivo: Arquivo de controle dos dados da tabela categoria_produto em nosso sistema
 * Data: 06/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

var categoriaProdutoDAO = require('../model/DAO/categoria_produtoDAO.js')

var message = require('./modulo/config.js') 

const getCategoriaProduto =  async () => {
    
    let dadosCategoriaProdutoJSON = {}

    let dadosCategoriaProduto = await categoriaProdutoDAO.selectAllCategoriaProduto()

    if(dadosCategoriaProduto){
        dadosCategoriaProdutoJSON.status = message.SUCCESS_REQUEST.status
        dadosCategoriaProdutoJSON.message = message.SUCCESS_REQUEST.message
    }
}