/******
 * Objetivo: Arquivo de conexão com a tabela fotos do banco de dados
 * Data: 09/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectAllFotos
 = async () => {
 
    let sql = `
    select * from tbl_fotos

    `

    let resultadoDadosFotos
     = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosFotos
        .length > 0)
        return resultadoDadosFotos

    else
        return false
    
}

const selectFotosById = async (idFotos) => {
 
    let sql = `
    select * from tbl_fotos where id = ${idFotos}
    `

    let resultadoDadosFotos = await prisma.$queryRawUnsafe(sql)

if(resultadoDadosFotos.length > 0)
    return resultadoDadosFotos
else
    return false
}

const selectFotosByIdProduto = async (idFotos) => {
 
    let sql = `
    select tbl_fotos.anexo as url from tbl_fotos where id_produto = ${idFotos}
    `

    let resultadoDadosFotos = await prisma.$queryRawUnsafe(sql)

if(resultadoDadosFotos.length > 0)
    return resultadoDadosFotos
else
    return false
}

const insertFotos = async (dadosFotos) => {

    for(const foto of dadosFotos.anexo){
        let sql = `
        insert into tbl_fotos 
        (
            anexo,
            id_produto
        ) values (
            '${foto}',
            ${dadosFotos.id_produto}
        )
    `

    var resultadoDadosFotos = await prisma.$executeRawUnsafe(sql)
    }

    

    

    if(resultadoDadosFotos)
        return true
    else 
        return false
}

const updateFotos = async (dadosFotos) => {

    let sql1 = `
        delete from tbl_fotos where id_produto = ${dadosFotos.id_produto}
    `
    var resultadoDadosFotos = await prisma.$executeRawUnsafe(sql1)

    if(resultadoDadosFotos){
        for(const foto of dadosFotos.anexo){
            let sql = `
            insert into tbl_fotos 
            (
                anexo,
                id_produto
            ) values (
                '${foto}',
                ${dadosFotos.id_produto}
            )
        `
    
        var resultadoDadosFotos2 = await prisma.$executeRawUnsafe(sql)
        }
    }

    if(resultadoDadosFotos2)
        return true
    else 
        return false

}

const deleteFotos = async (id_produto) => {
    let sql1 = `
    delete from tbl_fotos where id_produto = ${id_produto}
    `
    var resultadoDadosFotos = await prisma.$executeRawUnsafe(sql1)

    if(resultadoDadosFotos)
        return true
    else 
        return false

}



const selectLastId = async function(){
    let sql = `select * from tbl_fotos order by id desc limit 1;`

    let resultadoDadosFotos = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosFotos.length > 0){
        return resultadoDadosFotos
    } else
        return false

}


module.exports = {
    selectAllFotos,
    selectFotosById,
    selectLastId,
    insertFotos,
    updateFotos,
    deleteFotos,
    selectFotosByIdProduto
}