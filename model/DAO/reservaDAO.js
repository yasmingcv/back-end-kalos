/*******************************************************************************
 * Objetivo: Arquivo de conexão com a tabela de reservas do banco de dados
 * Data: 10/11/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ******************************************************************************/

var { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient()
const { DateTime } = require('luxon')

const insertReserva = async function(dadosReserva) {
    const timeZone = 'America/Sao_Paulo'
    const now = DateTime.now().setZone(timeZone)

    let sql = `insert into tbl_reserva (
            quantidade, 
            data,  
            codigo, 
            total, 
            id_produto, 
            id_aluno, 
            id_status_reserva
        ) values (
            '${dadosReserva.quantidade}',
            '${now.toFormat('yyyy-MM-dd HH:mm:ss')}',
            '${dadosReserva.codigo}',
            '${dadosReserva.total}',
             ${dadosReserva.id_produto},
             ${dadosReserva.id_aluno},
             ${dadosReserva.id_status_reserva}
        )`


    let rsReserva = await prisma.$executeRawUnsafe(sql)

    if(rsReserva)
        return true
    else
        return false
}

const updateReserva = async function(dadosReserva, id) {
    const timeZone = 'America/Sao_Paulo'
    const now = DateTime.now().setZone(timeZone)

    let sql = `update tbl_reserva set
            quantidade = '${dadosReserva.quantidade}', 
            data = '${dadosReserva.data}',  
            codigo = '${dadosReserva.codigo}', 
            total = '${dadosReserva.total}', 
            id_produto = ${dadosReserva.id_produto}, 
            id_aluno = ${dadosReserva.id_aluno}, 
            id_status_reserva = ${dadosReserva.id_status_reserva}
        
            where id = ${id}
            `


    let rsReserva = await prisma.$executeRawUnsafe(sql)

    if(rsReserva)
        return true
    else
        return false
}

const selectReservasByIdAlunoAndIdAcademia = async function(idAluno, idAcademia){

    let sql = `select tbl_reserva.*, tbl_aluno.nome as nome_aluno,  tbl_status_reserva.nome as status_reserva, tbl_produto.nome as nome_produto, tbl_produto.id_academia
	
    from tbl_reserva
    
		inner join tbl_aluno
			on tbl_aluno.id = tbl_reserva.id_aluno
		inner join tbl_status_reserva
			on tbl_status_reserva.id = tbl_reserva.id_status_reserva
		inner join tbl_produto
			on tbl_produto.id = tbl_reserva.id_produto
            
		where tbl_aluno.id = ${idAluno} and tbl_produto.id_academia = ${idAcademia}
;`

    let resultReservas = await prisma.$queryRawUnsafe(sql)

    if(resultReservas.length > 0){
        return resultReservas
    } else {
        return false
    }
}

const deleteReserva = async function(idReserva){
    let sql = `delete from tbl_reserva where id = ${idReserva}`

    let resultReserva = await prisma.$queryRawUnsafe(sql)

    if(resultReserva)
        return true
    else
        return false
}

module.exports = {
    insertReserva,
    updateReserva,
    selectReservasByIdAlunoAndIdAcademia,
    deleteReserva
}