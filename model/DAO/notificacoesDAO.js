/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das notificações da academia no banco de dados
 * Data: 10/10/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const selectNotificacoesByIdAcademia = async function (idAcademia) {
    let sql = `select * from tbl_notificacoes where id_academia = ${idAcademia}`

    let rsNotificacoes = await prisma.$queryRawUnsafe(sql)

    if(rsNotificacoes.length > 0){
        return rsNotificacoes
    } else {
        return false
    }
}

const insertNotificacao = async function (dadosNotificacao) {
    let sql = `insert into tbl_notificacoes (
                        texto, 
                        data_horario, 
                        id_academia   
                    ) values (
                        '${dadosNotificacao.texto}', 
                        current_timestamp(), 
                        ${dadosNotificacao.id_academia}
                )`

    let rsNotificacao = await prisma.$queryRawUnsafe(sql)

    if(rsNotificacao){
        return rsNotificacao
    } else {
        return false
    }
}

const deleteNotificacao = async function (idNotificacao) {
    let sql = `delete from tbl_notificacao where id = ${idNotificacao}`

    let rsNotificacao = await prisma.$queryRawUnsafe(sql)

    if(rsNotificacao){
        return rsNotificacao
    } else {
        return false
    }
}

module.exports = {
    selectNotificacoesByIdAcademia,
    insertNotificacao,
    deleteNotificacao
}