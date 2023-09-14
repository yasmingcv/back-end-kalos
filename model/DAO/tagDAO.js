/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das tags no banco de dados
 * Data: 14/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

var { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient()

// Seleciona todas as tags
const selectAllTags = async function (){

    let sql = `select * from tbl_tags;`

    let rsTags = await prisma.$queryRawUnsafe(sql)

    if(rsTags.length > 0) {
        return rsTags
    } else{
        return false
    }
}

module.exports = {selectAllTags}