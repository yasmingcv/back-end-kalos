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
        dadosCategoriaProdutoJSON.categorias = dadosCategoriaProduto

        return dadosCategoriaProdutoJSON
    }else{
        return message.ERROR_NOT_FOUND
    }
}

const getCategoriaProdutoById = async (idCategoriaProduto) => {

    let dadosCategoriaProdutoJSON = {}

    if(idCategoriaProduto == '' || idCategoriaProduto == undefined || isNaN(idCategoriaProduto)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosCategoriaProduto = await categoriaProdutoDAO.selectCategoriaProdutoById(idCategoriaProduto)

        if(dadosCategoriaProduto){
            dadosCategoriaProdutoJSON.status = message.SUCCESS_REQUEST.status
            dadosCategoriaProdutoJSON.message = message.SUCCESS_REQUEST.message
            dadosCategoriaProdutoJSON.categorias = dadosCategoriaProduto
    
            return dadosCategoriaProdutoJSON
        }else{
            return message.ERROR_NOT_FOUND
        }

    }
}

const inserirCategoriaProduto =  async (dadosCategoriaProduto) => {
    let dadosCategoriaProdutoJSON = {}

    if(dadosCategoriaProduto.nome == ''|| dadosCategoriaProduto.nome == undefined || dadosCategoriaProduto.nome.length > 45){
        return message.ERROR_REQUIRED_FIELDS   
    }else{
        let resultadoCategoriaProduto = await categoriaProdutoDAO.insertCategoriaProduto(dadosCategoriaProduto)

        if(resultadoCategoriaProduto){
            let novaCategoriaProduto = await categoriaProdutoDAO.selectLastId()
            dadosCategoriaProdutoJSON.status = message.SUCCESS_REQUEST.status
            dadosCategoriaProdutoJSON.message = message.SUCCESS_REQUEST.message
            dadosCategoriaProdutoJSON.categorias = novaCategoriaProduto
    
            return dadosCategoriaProdutoJSON
        }else{
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarCategoriaProduto =  async (dadosCategoriaProduto, idCategoriaProduto) => {
    

    if(dadosCategoriaProduto.nome == ''|| dadosCategoriaProduto.nome == undefined || dadosCategoriaProduto.nome.length > 45){
        return message.ERROR_REQUIRED_FIELDS   
    }else if(idCategoriaProduto == '' || idCategoriaProduto == undefined || isNaN(idCategoriaProduto)){
        return message.ERROR_INVALID_ID
    }else{
        let resultadoCategoriaProduto = await categoriaProdutoDAO.selectCategoriaProdutoById(idCategoriaProduto)


        if(resultadoCategoriaProduto){
            let atualizadoCategoriaProduto = await categoriaProdutoDAO.updateCategoriaProduto(dadosCategoriaProduto, idCategoriaProduto)

            if(atualizadoCategoriaProduto){
                let dadosCategoriaProdutoJSON = {}
                dadosCategoriaProduto.id = idCategoriaProduto
                dadosCategoriaProdutoJSON.status = message.SUCCESS_REQUEST.status
                dadosCategoriaProdutoJSON.message = message.SUCCESS_REQUEST.message
                dadosCategoriaProdutoJSON.categoria =  dadosCategoriaProduto
        
                return dadosCategoriaProdutoJSON
            }
           
        }else{
            return message.ERROR_INTERNAL_SERVER
        }
    }
}



module.exports = {
    getCategoriaProduto,
    getCategoriaProdutoById,
    inserirCategoriaProduto,
    atualizarCategoriaProduto
}