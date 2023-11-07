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

    let resultadoDadosCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto.length > 0)
        return resultadoDadosCategoriaProduto
    else
        return false
    
}

const selectCategoriaProdutoById = async (idCategoriaProduto) => {
 
        let sql = `
        select * from tbl_categoria_produto where id = ${idCategoriaProduto}
        `

        let resultadoDadosCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto.length > 0)
        return resultadoDadosCategoriaProduto
    else
        return false
}

const insertCategoriaProduto = async (dadosCategoriaProduto) => {

    let sql = `
            insert into tbl_categoria_produto 
            (nome)
            values 
            ('${dadosCategoriaProduto.nome}')
    `

    var resultadoDadosCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto)
        return true
    else 
        return false
}

const updateCategoriaProduto = async (dadosCategoriaProduto, idCategoriaProduto) => {

    let sql = `
            update tbl_categoria_produto set
            nome = '${dadosCategoriaProduto.nome}'
            where id = ${idCategoriaProduto}
    `

    var resultadoDadosCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto)
        return true
    else 
        return false

}

const deleteCategoriaProduto = async (idCategoriaProduto) => {

    let sql = `
        delete from tbl_categoria_produto where id = ${idCategoriaProduto}
    `

    var resultadoDadosCategoriaProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto)
        return true
    else 
        return false
    
}

const selectLastId = async function(){
    let sql = `select * from tbl_categoria_produto order by id desc limit 1;`

    let resultadoDadosCategoriaProduto = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosCategoriaProduto.length > 0){
        return resultadoDadosCategoriaProduto
    } else
        return false

}

module.exports = {
    selectAllCategoriaProduto,
    selectCategoriaProdutoById,
    insertCategoriaProduto,
    selectLastId,
    updateCategoriaProduto,
    deleteCategoriaProduto
}
