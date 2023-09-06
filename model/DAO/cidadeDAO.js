/******
 * Objetivo: Arquivo de conexão com a tabela cidade do banco de dados
 * Data: 05/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectCidadeById = async function(idCidade){

    let sql = ` select tbl_cidade.nome as nome_cidade, tbl_estado.nome as nome_estado
    
                        from tbl_cidade
                            inner joins tbl_estado
                                on tbl_estado.id = tbl_cidade.id_estado where tbl_cidade.id = ${idCidade}`

    let resultadoCidade = await prisma.$queryRawUnsafe(sql)

    if(resultadoCidade.length > 0)
        return true
    else
        return false

}

const insertCidade = async function (dadosCidade){

    let sql = `insert into tbl_cidade (
        nome
    ) values (
        '${dadosCidade.nome}'
    );`

    let resultadoCidade = await prisma.$executeRawUnsafe(sql)

    if(resultadoCidade)
        return true
    else
        return false
}

const updateCidade = async function (dadosCidade){

    let sql = ` update tbl_cidade set
                nome = '${dadosCidade.nome}'`

    
    let resultadoCidade = await prisma.$executeRawUnsafe(sql)

    if(resultadoCidade)
        return true
    else
        return false
}

const deleteCidade = async function (idCidade){
    let sql = `delete from tbl_cidade where id = ${idCidade}`

    let resultadoCidade = await prisma.$queryRawUnsafe(sql)

    if(resultadoCidade)
        return true
    else
        return false
}

module.exports = {
    selectCidadeById,
    insertCidade,
    updateCidade,
    deleteCidade
}