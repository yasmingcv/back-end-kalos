/******
 * Objetivo: Arquivo de conexão com a tabela serie do banco de dados
 * Data: 20/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

// Retornar todas as series
const selectAllSeries = async function(){

    let sql = `select * from tbl_serie`

    let resultadoSerie = await prisma.$queryRawUnsafe(sql)

    if(resultadoSerie.length > 0)
        return resultadoSerie
    else
        return false
}

const selectSerieByID = async function(idSerie){

    let sql = `select * from tbl_serie where id = ${idSerie}`

    let resultadoSerie = await prisma.$queryRawUnsafe(sql)

    if(resultadoSerie.length > 0)
        return resultadoSerie[0]
    else
        return false
}

// Insere uma nova serie

const insertSerie = async function(dadosSerie){

    let sql = `insert into tbl_serie (
        numero
    ) values (
        '${dadosSerie.numero}'
    );`

    let resultadoSerie = await prisma.$executeRawUnsafe(sql)

    if(resultadoSerie)
        return true
    else
        return false
}

const updateSerie = async function(dadosSerie){

    let sql = `update tbl_serie set
                numero = '${dadosSerie.numero}'
                where id = ${dadosSerie.id};`

    let resultadoSerie = await prisma.$executeRawUnsafe(sql)

    if(resultadoSerie)
        return true
    else
        return false

}

const deleteSerie = async function(idSerie){

    let sql = `delete from tbl_serie where id = ${idSerie}`

    let resultadoSerie = await prisma.$executeRawUnsafe(sql)

    if(resultadoSerie)
        return true
    else
        return false
}

const selectLastId = async function(){
    let sql = `select * from tbl_serie order by id desc limit 1;`

    let resultadoSerie = await prisma.$queryRawUnsafe(sql)

    if(resultadoSerie.length > 0){
        return resultadoSerie
    } else
        return false

}

module.exports = {
    selectAllSeries,
    selectLastId,
    selectSerieByID,
    insertSerie,
    updateSerie,
    deleteSerie
}