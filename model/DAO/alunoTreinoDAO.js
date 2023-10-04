/******
 * Objetivo: Arquivo de conexão com a tabela aluno_treino do banco de dados
 * Data: 04/10/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


const insertAlunoTreino = async function(dadosAlunoTreino){

    let sql = `insert into tbl_aluno_treino (
                id_aluno,
                id_treino_nivel_categoria
        ) values (
                ${dadosAlunoTreino.id_aluno},
                ${dadosAlunoTreino.id_treino_nivel_categoria}
    );`

    let resultadoAlunoTreino = await prisma.$executeRawUnsafe(sql)

    if(resultadoAlunoTreino)
        return true
    else 
        return false
}

module.exports = {
    insertAlunoTreino
}