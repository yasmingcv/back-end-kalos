/******
 * Objetivo: Arquivo de conexão com a tabela exercicios do banco de dados
 * Data: 25/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

// Retornar todos os exercícios da academia
const selectAllExercicios = async function(idAcademia){

    let sql = `select * from tbl_exercicio where id_academia = ${idAcademia}`

    let resultadoExercicios = await prisma.$queryRawUnsafe(sql)

    if(resultadoExercicios.length > 0)
        return resultadoExercicios
    else
        return false
}

// Retorna um exercício pelo id
const selectExercicioByID = async function(idExercicio){

    let sql = `select * from tbl_exercicio where id = ${idExercicio}`

    let resultadoExercicios = await prisma.$queryRawUnsafe(sql)

    if(resultadoExercicios.length > 0)
        return resultadoExercicios[0]
    else
        return false
}

// Retorna um exercício pelo nome
const selectExercicioByName = async function(nomeExercicio){

    let sql = `select * from tbl_exercicio where nome = ${nomeExercicio}`

    let resultadoExercicios = await prisma.$queryRawUnsafe(sql)

    if(resultadoExercicios.length > 0)
        return resultadoExercicios
    else
        return false
}

// Insere um novo exercício
const insertExercicio = async function(dadosExercicio){

    let sql = `insert into tbl_exercicio (
        nome,
        descricao,
        anexo,
        duracao,
        id_academia
    ) values (
        '${dadosExercicio.nome}',
        '${dadosExercicio.descricao}',
        '${dadosExercicio.anexo}',
        '${dadosExercicio.duracao}',
        ${dadosExercicio.id_academia}
    );`

    let resultadoExercicios = await prisma.$executeRawUnsafe(sql)

    if(resultadoExercicios)
        return true
    else
        return false
}

// Atualiza um exercício
const updateExercicio = async function(dadosExercicio){

    let sql = `update tbl_exercicio set
                nome = '${dadosExercicio.nome}',
                descricao = '${dadosExercicio.descricao}',
                anexo = '${dadosExercicio.anexo}',
                duracao = '${dadosExercicio.duracao}',
                id_academia = ${dadosExercicio.id_academia}
                where id = ${dadosExercicio.id};`

    let resultadoExercicios = await prisma.$executeRawUnsafe(sql)

    if(resultadoExercicios)
        return true
    else
        return false
}

// Deleta um exercício
const deleteExercicio = async function(idExercicio){

    let sql =  `delete from tbl_exercicio where id = ${idExercicio}`

    let resultadoExercicios = await prisma.$executeRawUnsafe(sql)

    if(resultadoExercicios)
        return true
    else
        return false
}

// Função para selecionar o ultimo id inserido no banco e poder retornar para a requisição
const selectLastId = async function(){
    let sql = `select * from tbl_exercicio order by id desc limit 1;`

    let resultadoExercicios = await prisma.$queryRawUnsafe(sql)

    if(resultadoExercicios.length > 0){
        return resultadoExercicios
    } else
        return false

}

module.exports = {
    selectAllExercicios,
    selectExercicioByID,
    selectExercicioByName,
    selectLastId,
    insertExercicio,
    updateExercicio,
    deleteExercicio
}

