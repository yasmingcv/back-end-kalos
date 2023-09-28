/******
 * Objetivo: Arquivo de conexão com a tabela treino do banco de dados
 * Data: 03/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()



const selectAllTreinos = async function(){

    let sql = `select * from tbl_treino`

    let resultadoTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoTreino.length > 0){
        return resultadoTreino
    } else {
        return false
    }
}
// Seleciona o treino pelo id
const selectTreinoById = async function(idTreino){
    let sql = `select * from tbl_treino where id = ${idTreino}`

    let resultadoTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoTreino.length > 0)
        return resultadoTreino[0]
    else
        return false
}

const insertExercicio = async function(dadosExercicio){
    let sql = `insert into tmp_tbl_exercicios_series_repeticoes (id_exercicio, id_serie, id_repeticao, duracao) values 
            (
                ${dadosExercicio.id_exercicio}, 
                ${dadosExercicio.id_serie}, 
                ${dadosExercicio.id_repeticao}, 
                ${dadosExercicio.duracao}
                
                )
                `

    let rsTempExercicios = await prisma.$executeRawUnsafe(sql)

    if(rsTempExercicios)
        return rsTempExercicios
    else
        return false
}

const insertTreino = async function(dadosTreino){
    let sqlCriaTempTable = `
    create temporary table tmp_tbl_exercicios_series_repeticoes (
        id_exercicio int,
        id_serie int,
        id_repeticao int,
        duracao time
    )`

    await prisma.$executeRawUnsafe(sqlCriaTempTable)

    for(const exercicio of dadosTreino.exercicios){
        await insertExercicio(exercicio)
    }

    let sql = `call procInsertTreinoNivelCategoriaExercicios (
                '${dadosTreino.nome}', 
                '${dadosTreino.descricao}', 
                '${dadosTreino.foto}', 
                '${dadosTreino.data_criacao}', 
                ${dadosTreino.id_nivel}, 
                ${dadosTreino.id_categoria_treino}, 
                ${dadosTreino.id_academia}
            )`

    let rsTreino = await prisma.$queryRawUnsafe(sql)

    console.warn("rstreino",rsTreino);

    if(rsTreino){
        return rsTreino
    } else {
        return false
    }
}

// Atualiza um treino
const updateTreino = async function(dadosTreino){
    let sql = `update tbl_treino set
                nome = '${dadosTreino.nome}',
                descricao = '${dadosTreino.descricao}',
                foto = '${dadosTreino.foto}'
                where id = ${dadosTreino.id};`


    let resultadoTreino = await prisma.$executeRawUnsafe(sql)
    
    if (resultadoTreino)
        return true
    else
        return false
}

// Deleta um treino
const deleteTreino = async function(idTreino){
    let sql = `delete from tbl_treino where id = ${idTreino}`

    let resultadoTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoTreino)
        return true
    else
        return false
}
const selectLastId = async function(){
    let sql = `select * from tbl_treino order by id desc limit 1;`

    let resultadoNivel = await prisma.$queryRawUnsafe(sql)

    if(resultadoNivel.length > 0){
        return resultadoNivel
    } else
        return false

}
module.exports = {
    insertTreino,
    selectTreinoById,
    updateTreino,
    deleteTreino,
    selectAllTreinos,
    selectLastId
}