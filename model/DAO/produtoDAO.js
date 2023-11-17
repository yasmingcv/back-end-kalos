/******
 * Objetivo: Arquivo de conexão com a tabela produto do banco de dados
 * Data: 07/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectAllProduto = async () => {
 
    let sql = `
    select * from tbl_produto 
    `

    let resultadoDadosProduto = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosProduto.length > 0)
        return resultadoDadosProduto
    else
        return false
    
}


const selectProdutoById = async (idProduto) => {
 
    let sql = `
    select tbl_produto.*, tbl_categoria_produto.nome as categoria
    from tbl_produto 
    inner join tbl_categoria_produto
        on tbl_produto.id_categoria_produto = tbl_categoria_produto.id
    where tbl_produto.id = ${idProduto}
    `

    let resultadoDadosProduto = await prisma.$queryRawUnsafe(sql)

if(resultadoDadosProduto.length > 0)
    return resultadoDadosProduto
else
    return false
}

const selectProdutoByIdAcademia = async (idAcademia) => {
 
    let sql = `
    select tbl_produto.*, tbl_categoria_produto.nome as categoria
        from tbl_produto 
        inner join tbl_categoria_produto
        on tbl_produto.id_categoria_produto = tbl_categoria_produto.id
    where id_academia = ${idAcademia}
    `

    let resultadoDadosProduto = await prisma.$queryRawUnsafe(sql)

if(resultadoDadosProduto.length > 0)
    return resultadoDadosProduto
else
    return false
}

const insertProduto = async (dadosProduto) => {

    let sql = `
            insert into tbl_produto 
            (
                nome,
                descricao,
                preco,
                codigo,
                status,
                id_academia,
                id_categoria_produto
                )
            values 
            (
                '${dadosProduto.nome}',
                '${dadosProduto.descricao}',
                '${dadosProduto.preco}',
                '${dadosProduto.codigo}',
                '${dadosProduto.status}',
                ${dadosProduto.id_academia},
                ${dadosProduto.id_categoria_produto}
                )
    `

    var resultadoDadosProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosProduto)
        return true
    else 
        return false
}

const updateProduto = async (dadosProduto) => {

    let sql = `
            update tbl_produto set
            nome = '${dadosProduto.nome}',
            descricao = '${dadosProduto.descricao}',
            preco = '${dadosProduto.preco}',
            codigo = '${dadosProduto.codigo}',
            status = '${dadosProduto.status}',
            id_academia =  ${dadosProduto.id_academia},
            id_categoria_produto = ${dadosProduto.id_categoria_produto}
            where id = ${dadosProduto.id}
    `

    var resultadoDadosProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosProduto)
        return true
    else 
        return false

}

const deleteProduto = async (idProduto) => {

    let sql = `
        delete from tbl_produto where id = ${idProduto}
    `

    var resultadoDadosProduto = await prisma.$executeRawUnsafe(sql)

    if(resultadoDadosProduto)
        return true
    else 
        return false
    
}

const selectLastId = async function(){
    let sql = `select * from tbl_produto order by id desc limit 1;`

    let resultadoDadosProduto = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosProduto.length > 0){
        return resultadoDadosProduto
    } else
        return false

}

module.exports = {
    selectAllProduto,
    selectProdutoById,
    insertProduto,
    updateProduto,
    deleteProduto,
    selectLastId,
    selectProdutoByIdAcademia
}