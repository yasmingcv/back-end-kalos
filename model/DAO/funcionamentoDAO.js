/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos horários de funcionamento das academias no banco de dados
 * Data: 18/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient

const insertFuncionamento = async function (dadosFuncionamento) {
    let sql = `call procInsertFuncionamentoAcademia(
        ${dadosFuncionamento.id_academia},
        
        ${dadosFuncionamento.segunda.status},
        ${dadosFuncionamento.segunda.horario_inicio},
        ${dadosFuncionamento.segunda.horario_fim},
        
        ${dadosFuncionamento.terca.status},
        ${dadosFuncionamento.terca.horario_inicio},
        ${dadosFuncionamento.terca.horario_fim},
        
        ${dadosFuncionamento.quarta.status},
        ${dadosFuncionamento.quarta.horario_inicio},
        ${dadosFuncionamento.quarta.horario_fim},
        
        ${dadosFuncionamento.quinta.status},
        ${dadosFuncionamento.quinta.horario_inicio},
        ${dadosFuncionamento.quinta.horario_fim},
        
        ${dadosFuncionamento.sexta.status},
        ${dadosFuncionamento.sexta.horario_inicio},
        ${dadosFuncionamento.sexta.horario_fim},
        
        ${dadosFuncionamento.sabado.status},
        ${dadosFuncionamento.sabado.horario_inicio},
        ${dadosFuncionamento.sabado.horario_fim},
        
        ${dadosFuncionamento.domingo.status},
        ${dadosFuncionamento.domingo.horario_inicio},
        ${dadosFuncionamento.domingo.horario_fim}
    
    )`

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if (rsFuncionamento)
        return rsFuncionamento
    else
        return false
}

const updateFuncionamento = async function (dadosFuncionamento){
    let sql = `call procUpdateFuncionamentoAcademia(
        ${dadosFuncionamento.id_academia},
        
        ${dadosFuncionamento.segunda.status},
        ${dadosFuncionamento.segunda.horario_inicio},
        ${dadosFuncionamento.segunda.horario_fim},
        
        ${dadosFuncionamento.terca.status},
        ${dadosFuncionamento.terca.horario_inicio},
        ${dadosFuncionamento.terca.horario_fim},
        
        ${dadosFuncionamento.quarta.status},
        ${dadosFuncionamento.quarta.horario_inicio},
        ${dadosFuncionamento.quarta.horario_fim},
        
        ${dadosFuncionamento.quinta.status},
        ${dadosFuncionamento.quinta.horario_inicio},
        ${dadosFuncionamento.quinta.horario_fim},
        
        ${dadosFuncionamento.sexta.status},
        ${dadosFuncionamento.sexta.horario_inicio},
        ${dadosFuncionamento.sexta.horario_fim},
        
        ${dadosFuncionamento.sabado.status},
        ${dadosFuncionamento.sabado.horario_inicio},
        ${dadosFuncionamento.sabado.horario_fim},
        
        ${dadosFuncionamento.domingo.status},
        ${dadosFuncionamento.domingo.horario_inicio},
        ${dadosFuncionamento.domingo.horario_fim}
    
    )`

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
    let sql = `select tbl_funcionamento.id, tbl_funcionamento.status, time_format(tbl_funcionamento.horario_inicio, "%H:%i") as horario_inicio, time_format(tbl_funcionamento.horario_fim, "%H:%i") as horario_fim, tbl_funcionamento.id_academia, tbl_funcionamento.id_dia_semana,
                        tbl_dia_semana.dia,
                        tbl_academia.nome as nome_academia

                    from tbl_funcionamento
                        inner join tbl_dia_semana
                            on tbl_dia_semana.id = tbl_funcionamento.id_dia_semana
                        inner join tbl_academia
                            on tbl_academia.id = tbl_funcionamento.id_academia
                    
                    where tbl_academia.id = ${idAcademia}
                        `

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if (rsFuncionamento.length >= 1)
        return rsFuncionamento
    else
        return false
}

const deleteFuncionamentoByIdAcademia = async function(id_academia){
    let sql = `delete from tbl_funcionamento where tbl_funcionamento.id_academia = ${id_academia}`

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if(rsFuncionamento){
        return rsFuncionamento
    } else
        return false

}


const selectLastId = async function(){
    let sql = `select * from tbl_funcionamento order by id desc limit 1;`

    let rsFuncionamento = await prisma.$queryRawUnsafe(sql)

    if(rsFuncionamento.length > 0){
        return rsFuncionamento
    } else
        return false

}

module.exports = {
    insertFuncionamento,
    selectAllFuncionamentos,
    selectFuncionamentoByIdAcademia,
    selectLastId,
    updateFuncionamento,
    deleteFuncionamentoByIdAcademia
}