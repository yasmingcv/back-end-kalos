/******
 * Objetivo: Arquivo de conexão com a tabela categoria_treino do banco de dados
 * Data: 19/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

// Retornar todas as cateogiras
const selectAllCategoriasTreino = async function(){

    let sql = `select * from tbl_categoria_treino`

    let resultadoCategoriaTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoCategoriaTreino.length > 0)
        return resultadoCategoriaTreino
    else 
        return false
}

// Retorna uma categoria pelo id

const selectCategoriaTreinoByID = async function(idCategoriaTreino){

    let sql = `select * from tbl_categoria_treino where id = ${idCategoriaTreino}`

    let resultadoCategoriaTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoCategoriaTreino.length > 0)
        return resultadoCategoriaTreino[0]
    else
        return false
}

// Insere uma nova categoria
const insertCategoriaTreino = async function(dadosCategoriaTreino){

    let sql = `insert into tbl_categoria_treino (
        nome
    ) values (
        '${dadosCategoriaTreino.nome}'
    );`

    let resultadoCategoriaTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoCategoriaTreino)
        return true
    else
        return false

}

// Atualiza uma categoria
const updateCategoriaTreino = async function(dadosCategoriaTreino){

    let sql = `update tbl_categoria_treino set
                nome = '${dadosCategoriaTreino.nome}'
                where id = ${dadosCategoriaTreino.id};`

    let resultadoCategoriaTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoCategoriaTreino)
        return true
    else
        return false

}

// Deleta uma categoria
const deleteCategoriaTreino = async function(idCategoriaTreino){
    
    let sql = `delete from tbl_categoria_treino where id = ${idCategoriaTreino}`

    let resultadoCategoriaTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoCategoriaTreino)
        return true
    else
        return false
}

const selectLastId = async function(){
    let sql = `select * from tbl_categoria_treino order by id desc limit 1;`

    let resultadoCategoriaTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoCategoriaTreino.length > 0){
        return resultadoCategoriaTreino
    } else
        return false

}

module.exports = {
    selectAllCategoriasTreino,
    selectCategoriaTreinoByID,
    insertCategoriaTreino,
    updateCategoriaTreino,
    deleteCategoriaTreino,
    selectLastId
}