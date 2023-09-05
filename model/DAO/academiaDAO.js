/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das academias no banco de dados
 * Data: 05/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


const selectAcademiaByPassword = async function (dadosAcademia){
    let sql  = `select * from tbl_academia 
                    where email = ${dadosAcademia.email}
                    and
                    senha = ${dadosAcademia.senha}`

    let rsAcademia = prisma.$queryRawUnsafe(sql)

    if(rsAcademia.length > 0){
        return rsAcademia
    } else {
        return false
    }
}

module.exports = {
    selectAcademiaByPassword
}