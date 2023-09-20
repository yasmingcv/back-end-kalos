/******
 * Objetivo: Arquivo de conexão com a tabela repeticao do banco de dados
 * Data: 20/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


// Retornar todas as repeticoes
const selectAllRepeticoes = async function(){

    let sql = `select * from tbl_repeticao`

    let resultadoRepeticao = await prisma.$queryRawUnsafe(sql)

    if(resultadoRepeticao.length > 0){
        return resultadoRepeticao
    } else 
        return false
}

// Retorna a repeticao pelo id

const selectRepeticaoByID = async function(idRepeticao){

    let sql = `select * from tbl_repeticao where id = ${idRepeticao}`

    let resultadoRepeticao = await prisma.$queryRawUnsafe(sql)

    if(resultadoRepeticao.length > 0)
        return resultadoRepeticao[0]
    else
        return false
}

// Insere uma nova repeticao
const insertRepeticao = async function(dadosRepeticao){

    let sql = `insert into tbl_repeticao (
            numero
    ) values (
        '${dadosRepeticao.numero}'
    );`

    let resultadoRepeticao = await prisma.$executeRawUnsafe(sql)

    if(resultadoRepeticao)
        return true
    else
        return false
}

// Atualiza uma repeticao
const updateRepeticao = async function(dadosRepeticao){

    let sql = `update tbl_repeticao set
                numero = '${dadosRepeticao.numero}'
                where id = ${dadosRepeticao.id}`

    let resultadoRepeticao = await prisma.$executeRawUnsafe(sql)

    if(resultadoRepeticao)
        return true
    else
        return false
}

// Deleta uma repeticao
const deleteRepeticao = async function(idRepeticao){

    let sql = `delete from tbl_repeticao where id = ${idRepeticao}`

    let resultadoRepeticao = await prisma.$executeRawUnsafe(sql)

    if(resultadoRepeticao)
        return true
    else
        return false
}

const selectLastId = async function(){
    let sql = `select * from tbl_repeticao order by id desc limit 1;`

    let resultadoRepeticao = await prisma.$queryRawUnsafe(sql)

    if(resultadoRepeticao.length > 0){
        return resultadoRepeticao
    } else
        return false

}


module.exports = {
    selectAllRepeticoes,
    selectRepeticaoByID,
    insertRepeticao,
    updateRepeticao,
    deleteRepeticao,
    selectLastId
}