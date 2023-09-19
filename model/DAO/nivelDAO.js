/******
 * Objetivo: Arquivo de conexão com a tabela nivel do banco de dados
 * Data: 19/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


// Retorna todos os niveis
const selectAllNiveis = async function(){

    let sql = `select * from tbl_nivel`

    let resultadoNivel = await prisma.$queryRawUnsafe(sql)

    if(resultadoNivel.length > 0){
        return resultadoNivel
    } else {
        return false
    }

}

// Retorna um nível pelo id
const selectNivelById = async function(idNivel){

    let sql = `select * from tbl_nivel where id = ${idNivel}`

    let resultadoNivel = await prisma.$queryRawUnsafe(sql)

    if(resultadoNivel.length > 0)
        return resultadoNivel[0]
    else
        return false
}

// Insere um novo nivel de treino
const insertTreino = async function(dadosNivel){

    let sql = `insert into tbl_nivel (
        nome
    ) values (
        '${dadosNivel.nome}'
    );`

    let resultadoNivel = await prisma.$executeRawUnsafe(sql)

    if(resultadoNivel)
        return true
    else
        return false
}

// Atualiza um nível
const updateNivel = async function(dadosNivel){
    let sql = `update tbl_nivel set
                nome = '${dadosNivel.nome}'
                where id = ${dadosNivel.id};`

    let resultadoNivel = await prisma.$executeRawUnsafe(sql)

    if(resultadoNivel)
        return true
    else
        return false
}

// Deleta um nível
const deleteNivel = async function(idNivel){
    let sql = `delete from tbl_nivel where id = ${idNivel}`

    let resultadoNivel = await prisma.$executeRawUnsafe(sql)

    if(resultadoNivel)
        return true
    else
        return false
}

const selectLastId = async function(){
    let sql = `select * from tbl_nivel order by id desc limit 1;`

    let resultadoNivel = await prisma.$queryRawUnsafe(sql)

    if(resultadoNivel.length > 0){
        return resultadoNivel
    } else
        return false

}

module.exports = {
    selectAllNiveis,
    selectNivelById,
    insertTreino,
    updateNivel,
    deleteNivel,
    selectLastId
}
