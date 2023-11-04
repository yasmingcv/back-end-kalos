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

    if(resultadoAlunoTreino){
        return true
    } else{
        return false
    }

    // if(!dadosAlunoTreino.id_aluno || !dadosAlunoTreino.id_treino_nivel_categoria || dadosAlunoTreino.id_treino_nivel_categoria.length === 0){
    //     return false
    // }

    // try{
    //     for (const id_treino_nivel_categoria of dadosAlunoTreino.id_treino_nivel_categoria) {
    //         let sql = `INSERT INTO tbl_aluno_treino (id_aluno, id_treino_nivel_categoria) VALUES (${dadosAlunoTreino.id_aluno}, ${id_treino_nivel_categoria});`
    //         await prisma.$queryRawUnsafe(sql)
    //     }

    //     return true;
    // } catch(error) {
    //     console.error(error)
    //     return false
    // }

}

const selectAllAlunoTreino = async function(){
    
    let sql = `
    select  tbl_aluno_treino.id,
            tbl_aluno_treino.id_aluno,
            tbl_aluno_treino.id_treino_nivel_categoria

    from tbl_aluno_treino
    `
    let resultadoAlunoTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoAlunoTreino.length > 0)
        return resultadoAlunoTreino
    else
        return false
}

const selectAlunoTreinoById = async function(idAlunoTreino){
    
    let sql = `
    select   tbl_aluno_treino.id,
             tbl_aluno_treino.id_aluno,
             tbl_aluno_treino.id_treino_nivel_categoria
             
    from tbl_aluno_treino
    where id = ${idAlunoTreino}`

    let resultadoAlunoTreino = await prisma.$queryRawUnsafe(sql)


    if(resultadoAlunoTreino.length > 0)
        return resultadoAlunoTreino
    else
        return false
}

const selectAlunoTreinoByIdAcademia = async function(idAcademia){
    
    let sql = `
    select   tbl_aluno_treino.id,
             tbl_aluno_treino.id_aluno,
             tbl_aluno_treino.id_treino_nivel_categoria,
             tbl_treino_nivel_categoria.id_academia
             
    from tbl_aluno_treino
        inner join tbl_treino_nivel_categoria
            on tbl_aluno_treino.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id
            
    where tbl_treino_nivel_categoria.id_academia = ${idAcademia}`

    let resultadoAlunoTreino = await prisma.$queryRawUnsafe(sql)


    if(resultadoAlunoTreino.length > 0)
        return resultadoAlunoTreino
    else
        return false
}


const deleteAlunoTreino = async function(idAlunoTreino){
    let sql = `delete from tbl_aluno_treino where id = ${idAlunoTreino}`

    let resultadoAlunoTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoAlunoTreino){
        return resultadoAlunoTreino
    } else {
        return false
    }
}

module.exports = {
    insertAlunoTreino,
    selectAllAlunoTreino,
    selectAlunoTreinoById,
    selectAlunoTreinoByIdAcademia,
    deleteAlunoTreino
}