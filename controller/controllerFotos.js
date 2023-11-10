/******
 * Objetivo: Arquivo de controle dos dados da tabela fotos em nosso sistema
 * Data: 09/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

const fotosDAO = require('../model/DAO/fotosDAO.js')
var produtoDAO = require('../model/DAO/produtoDAO.js')
var message = require('./modulo/config.js') 

const getFotos =  async () => {
    
    let dadosFotosJSON = {}

    let dadosFotos = await fotosDAO.selectAllFotos()

    if(dadosFotos){
        dadosFotosJSON.status = message.SUCCESS_REQUEST.status
        dadosFotosJSON.message = message.SUCCESS_REQUEST.message
        dadosFotosJSON.Fotoss = dadosFotos

        return dadosFotosJSON
    }else{
        return message.ERROR_NOT_FOUND
    }
}


const getFotosById = async (idFotos) => {

    let dadosFotosJSON = {}

    if(idFotos == '' || idFotos == undefined || isNaN(idFotos)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosFotos = await fotosDAO.selectFotosById(idFotos)

        if(dadosFotos){
            dadosFotosJSON.status = message.SUCCESS_REQUEST.status
            dadosFotosJSON.message = message.SUCCESS_REQUEST.message
            dadosFotosJSON.Fotos = dadosFotos
    
            return dadosFotosJSON
        }else{
            return message.ERROR_NOT_FOUND
        }

    }
}

const inserirFotos = async ( dadosFotos) => {
    let dadosFotosJSON = {}

    if(
        dadosFotos.anexo == '' || dadosFotos.anexo == undefined ||  
        dadosFotos.id_produto == '' || dadosFotos.id_produto == undefined|| isNaN(dadosFotos.id_produto) 
      ){
        return message.ERROR_REQUIRED_FIELDS 
    }else{

        let verificacaoIdProduto = await produtoDAO.selectProdutoById(dadosFotos.id_produto)

        if(verificacaoIdProduto){
                let resultadoFotos = await fotosDAO.insertFotos(dadosFotos)

                if(!resultadoFotos){
                    return message.ERROR_INTERNAL_SERVER
                   
                }else{
                    dadosFotosJSON.status = message.SUCCESS_REQUEST.status
                    dadosFotosJSON.message = message.SUCCESS_REQUEST.message
                    dadosFotosJSON.fotos = dadosFotos

                    return dadosFotosJSON
                }
        }else{
            return message.ERROR_INVALID_ID
        }
        
    }


}

const atualizarFotos = async (dadosFotos, id_produto) => {
    let dadosFotosJSON = {}

    if(
        dadosFotos.anexo == '' || dadosFotos.anexo == undefined 
        
     ){
        return message.ERROR_REQUIRED_FIELDS 
    }else if (id_produto == '' || id_produto == undefined|| isNaN(id_produto)){
        return message.ERROR_INVALID_ID
    }else{
        dadosFotos.id_produto = id_produto
        let verificacaoIdProduto = await produtoDAO.selectProdutoById(dadosFotos.id_produto)

        if(verificacaoIdProduto){
           
                let resultadoFotos = await fotosDAO.updateFotos(dadosFotos)

                if(!resultadoFotos){
                    return message.ERROR_INTERNAL_SERVER
                   
                }else{
                    dadosFotosJSON.status = message.SUCCESS_REQUEST.status
                    dadosFotosJSON.message = message.SUCCESS_REQUEST.message
                    dadosFotosJSON.fotos = dadosFotos

                    return dadosFotosJSON
                }
        }else{
            return message.ERROR_INVALID_ID
        }
    }
}

const deletarFotos = async (idProduto) => {

    if(idProduto == '' || idProduto == undefined || isNaN(idProduto)){
        return message.ERROR_INVALID_ID
    }else{

    
        let statusId = await produtoDAO.selectProdutoById(idProduto)

        if(statusId){
            let resultadoProduto = await fotosDAO.deleteFotos(idProduto)

            if(resultadoProduto){
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            message.ERROR_INVALID_ID
        }

        

    }
}


module.exports = {
    getFotos,
    getFotosById,
    inserirFotos,
    atualizarFotos,
    deletarFotos
}