/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das categorias no banco de dados
 * Data: 04/10/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const selectAllCategorias = async function () {
    let sql = 'select * from tbl_categoria'

    let rsCategorias = await prisma.$queryRawUnsafe(sql)

    if(rsCategorias){
        return rsCategorias
    } else {
        return false
    }
}

module.exports = {
    selectAllCategorias
}