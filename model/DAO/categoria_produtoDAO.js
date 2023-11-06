/******
 * Objetivo: Arquivo de conexão com a tabela categoria_produto do banco de dados
 * Data: 06/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectAllCategoriaProduto = async () => {
 
    let sql = `
    select * from tbl_categoria_produto 
    `
}
const selectCategoriaProdutoById = async (idCategoriaProduto) => {
 
        let sql = `
        select * from tbl_categoria_produto where id = ${idCategoriaProduto}
        `
}


module.exports = {
    selectAllCategoriaProduto,
    selectCategoriaProdutoById
}
