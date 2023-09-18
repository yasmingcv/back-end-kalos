/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos horários de funcionamento das academias no banco de dados
 * Data: 18/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient

const insertFuncionamento = async function (dadosFuncionamento) {
    let sql = `insert into tbl_funcionamento (
        status, 
        horario_inicio, 
        horario_fim, 
        id_academia, 
        id_dia_semana) 
            values (
        ${dadosFuncionamento.status},
        ${dadosFuncionamento.horario_inicio},
        ${dadosFuncionamento.horario_fim},
        ${dadosFuncionamento.id_academia},
        ${dadosFuncionamento.id_dia_semana})`


    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if (rsFuncionamento)
        return rsFuncionamento
    else
        return false
}

const selectAllFuncionamentos = async function () {
    let sql = `select tbl_funcionamento.*, tbl_dia_semana.dia,
                    tbl_academia.nome as nome_academia

                from tbl_funcionamento
                    inner join tbl_dia_semana
                        on tbl_dia_semana.id = tbl_funcionamento.id_dia_semana
                    inner join tbl_academia
                        on tbl_academia.id = tbl_funcionamento.id_academia
                        
                        order by tbl_academia.nome asc`

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if (rsFuncionamento.length > 0)
        return rsFuncionamento
    else
        return false
}

const selectFuncionamentoByIdAcademia = async function (idAcademia) {
    let sql = `select tbl_funcionamento.*, tbl_dia_semana.dia,
                    tbl_academia.nome as nome_academia

                from tbl_funcionamento
                    inner join tbl_dia_semana
                        on tbl_dia_semana.id = tbl_funcionamento.id_dia_semana
                    inner join tbl_academia
                        on tbl_academia.id = tbl_funcionamento.id_academia
                    
                    where tbl_academia.id = ${idAcademia}
                        `

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if (rsFuncionamento.length > 0)
        return rsFuncionamento
    else
        return false
}

module.exports = {
    insertFuncionamento,
    selectAllFuncionamentos,
    selectFuncionamentoByIdAcademia
}