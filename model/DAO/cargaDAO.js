/*******************************************************************************
 * Objetivo: Arquivo de conexão com a tabela postagens do banco de dados
 * Data: 18/10/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******************************************************************************/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

// Seleciona todas as cargas do aluno
const selectAllCargasByIdAlunoAndIdExercicioSerieRepeticao = async function(idAluno, idExercicioSerieRepeticao){

    let sql = `select   tbl_carga.id, tbl_carga.peso, tbl_carga.data_horario,
                        tbl_carga.id_aluno,
                        tbl_carga.id_exercicio_serie_repeticao
                    
                    
                from tbl_carga
                    inner join tbl_aluno
                        on tbl_aluno.id = tbl_carga.id_aluno
                    inner join tbl_exercicio_serie_repeticao
                        on tbl_exercicio_serie_repeticao.id = tbl_carga.id_exercicio_serie_repeticao
                        
                        where tbl_carga.id_aluno = ${idAluno} AND tbl_carga.id_exercicio_serie_repeticao = ${idExercicioSerieRepeticao}`

                        console.log(sql);

    let resultadoCarga = await prisma.$queryRawUnsafe(sql)

    if(resultadoCarga.length > 0)
        return resultadoCarga
    else
        return false
}

// Seleciona uma carga pelo ID
const selectCargaById = async function(idCarga){

    let sql = `select tbl_carga.*
            
        from tbl_carga
            inner join tbl_aluno
                on tbl_aluno.id = tbl_carga.id_aluno
            inner join tbl_exercicio_serie_repeticao
                on tbl_exercicio_serie_repeticao.id = tbl_carga.id_exercicio_serie_repeticao
                
            where tbl_carga.id = ${idCarga}`
    
    let resultadoCarga = await prisma.$queryRawUnsafe(sql)

    if(resultadoCarga.length > 0)
        return resultadoCarga[0]
    else
        return false
}

// Insere uma nova carga
const insertCarga = async function(dadosCarga){

    let sql = `insert into tbl_carga(
        peso,
        data_horario,
        id_aluno,
        id_exercicio_serie_repeticao
    ) values (
        '${dadosCarga.peso}',
        NOW(),
        ${dadosCarga.id_aluno},
        ${dadosCarga.id_exercicio_serie_repeticao}
    );`

    let resultadoCarga = await prisma.$executeRawUnsafe(sql)

    if(resultadoCarga)
        return true
    else
        return false
}

// Atualiza uma carga
const updateCarga = async function(dadosCarga){

    let sql = ` update tbl_carga set
                peso = '${dadosCarga.peso}',
                data_horario = NOW(),
                id_aluno = '${dadosCarga.id_aluno}',
                id_exercicio_serie_repeticao = '${dadosCarga.id_exercicio_serie_repeticao}'
                
                where id = ${dadosCarga.id}`

    let resultadoCarga = await prisma.$executeRawUnsafe(sql)
    
    if(resultadoCarga)
        return true
    else
        return false
}

// Deleta uma carga
const deleteCarga = async function(idCarga){
    let sql = `delete from tbl_carga where id = ${idCarga}`

    let resultadoCarga = await prisma.$queryRawUnsafe(sql)

    if(resultadoCarga)
        return true
    else
        return false
}

// suporte
const selectLastId = async function(){
    let sql = `select * from tbl_carga order by id desc limit 1;`

    let resultadoCarga = await prisma.$queryRawUnsafe(sql)

    if(resultadoCarga.length > 0){
        return resultadoCarga
    } else
        return false

}

module.exports = {
    selectAllCargasByIdAlunoAndIdExercicioSerieRepeticao,
    selectCargaById,
    selectLastId,
    insertCarga,
    updateCarga,
    deleteCarga
    
}