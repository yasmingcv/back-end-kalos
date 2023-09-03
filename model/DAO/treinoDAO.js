/******
 * Objetivo: Arquivo de conexão com a tabela treino do banco de dados
 * Data: 03/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

// Seleciona o treino pelo id
const selectTreinoById = async function(idTreino){
    let sql = `select * from tbl_treino where id = ${idTreino}`

    let resultadoTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoTreino.length > 0)
        return resultadoTreino
    else
        return false
}

// Insere um novo treino
const insertTreino = async function(dadosTreino){
    let sql = `insert into tbl_treino (
        nome,
        descricao,
        foto,
        data_criacao
    ) values (
        '${dadosTreino.nome}',
        '${dadosTreino.descricao}',
        '${dadosTreino.foto}',
        '${dadosTreino.data_criacao}',
    );`

    let resultadoTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoTreino)
        return true
    else
        return false
}

// Atualiza um treino
const updateTreino = async function(dadosTreino){
    let sql = `update tbl_treino set
                nome = '${dadosTreino.id}'`

    let resultadoTreino = await prisma.$executeRawUnsafe(sql)

    if (resultadoTreino)
        return true
    else
        return false
}

// Deleta um treino
const deleteTreino = async function(idTreino){
    let sql = `delete from tbl_treino where id = ${idTreino}`

    let resultadoTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoTreino)
        return true
    else
        return false
}

module.exports = {
    insertTreino,
    selectTreinoById,
    updateTreino,
    deleteTreino
}