/******
 * Objetivo: Arquivo de conexão com a tabela estado do banco de dados
 * Data: 05/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectEstadoById = async function (idEstado){

    let sql = `select * from tbl_estado where id = ${idEstado}`

    let resultadoEstado = await prisma.$queryRawUnsafe(sql)

    if(resultadoEstado.length > 0)
        return true
    else
        return false
}
// Insere um estado
const insertEstado = async function (dadosEstado){

    let sql = `insert into tbl_estado (
        nome
    ) values (
        '${dadosEstado.nome}'
    );`

    let resultadoEstado = await prisma.$executeRawUnsafe(sql)

    if(resultadoEstado)
        return true
    else
        return false
}
// Atualiza um estado
const updateEstado = async function (dadosEstado){

    let sql = ` update tbl_estado set
                nome = '${dadosEstado.nome}'`


    let resultadoEstado = await prisma.$executeRawUnsafe(sql)

    if(resultadoEstado)
        return true
    else
        return false
}
// Deleta um estado
const deleteEstado = async function(idEstado){

    let sql = `delete from tbl_estado where id = ${idEstado}`

    let resultadoEstado = await prisma.$queryRawUnsafe(sql)

    if(resultadoEstado)
        return true
    else
        return false
}

module.exports = {
    insertEstado,
    updateEstado,
    deleteEstado,
    selectEstadoById
}