/******
 * Objetivo: Arquivo de conexão com a tabela aluno do banco de dados
 * Data: 31/08/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()



// Seleciona o gênero pelo id
const selectGeneroById = async function(idGenero){
    console.log(idGenero)
    let sql = `select * from tbl_genero where id = ${idGenero}`

    let resultadoGenero = await prisma.$queryRawUnsafe(sql)

    console.log(resultadoGenero)
    if(resultadoGenero.length > 0)
        return resultadoGenero
    else
        return false    
    
    
}

// Insere um novo gênero
const insertGenero = async function(dadosGenero){
    let sql = `insert into tbl_genero (
        nome
        ) values (
            '${dadosGenero.nome}'
        );`

    let resultadoGenero = await prisma.$executeRawUnsafe(sql)

    if(resultadoGenero){
        return true
    }else{
        return false
    }
}

// Atualiza os dados do gênero
const updateGenero = async function(dadosGenero){
    let sql = `update tbl_genero set
                nome = '${dadosGenero.nome}' where id = ${dadosGenero.id}`

    let resultadoGenero= await prisma.$executeRawUnsafe(sql)

    if (resultadoGenero)
        return true
    else
        return false    
}

// Deleta um gênero
const deleteGenero = async function(idGenero){
    let sql = `delete from tbl_genero where id = ${idGenero}`

    let resultadoGenero = await prisma.$queryRawUnsafe(sql)

    if(resultadoGenero)
        return true
    else
        return false
}

module.exports = {
    insertGenero,
    selectGeneroById,
    updateGenero,
    deleteGenero
}