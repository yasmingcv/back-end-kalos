/******
 * Objetivo: Arquivo de conexão com a tabela treinoNivelCategoria do banco de dados
 * Data: 04/10/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectTreinoNivelCategoriaById = async function(idTreinoNivelCategoria){

    let sql = `
    select   tbl_treino_nivel_categoria.id,
                        tbl_treino.id as id_treino,
                        tbl_treino.nome,
                        tbl_treino.descricao,
                        tbl_treino.foto,
                        date_format(tbl_treino.data_criacao, '%d/%m/%y') as data_criacao,
                        tbl_nivel.nome as nome_nivel,
                        tbl_categoria_treino.nome as nome_categoria_treino,
                        tbl_academia.id as id_academia
                        
             from tbl_treino_nivel_categoria
                inner join tbl_treino
                    on tbl_treino_nivel_categoria.id_treino = tbl_treino.id
                inner join tbl_nivel
                    on tbl_treino_nivel_categoria.id_nivel = tbl_nivel.id
                inner join tbl_categoria_treino
                    on tbl_treino_nivel_categoria.id_categoria_treino = tbl_categoria_treino.id
                inner join tbl_academia
                    on tbl_treino_nivel_categoria.id_academia = tbl_academia.id 
                    
            where tbl_treino_nivel_categoria.id = ${idTreinoNivelCategoria}`

    let rsTreinoNivelCategoria = await prisma.$queryRawUnsafe(sql)

    if(rsTreinoNivelCategoria.length > 0){
        return rsTreinoNivelCategoria[0]
    } else {
        return false
    }
}
const selectAlunosOnTreinoNivelCategoriaByIdAcademiaAndIdTreino = async function(idAcademia, idTreino){

    let sql = `
    select  tbl_treino_nivel_categoria.id as id_treino_nivel_categoria
            tbl_aluno.*,
            tbl_academia.id as id_academia
            
            from tbl_aluno_treino
                inner join tbl_aluno
                    on tbl_aluno_treino.id_aluno = tbl_aluno.id
                inner join tbl_treino_nivel_categoria
                    on tbl_aluno_treino.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id
                inner join tbl_academia
                    on tbl_treino_nivel_categoria.id_academia = tbl_academia.id
                    
                where tbl_treino_nivel_categoria.id_academia = ${idAcademia} AND tbl_aluno_treino.id_treino_nivel_categoria = ${idTreino}
                
                order by id desc`

    let rsTreinoNivelCategoria = await prisma.$queryRawUnsafe(sql)

    if(rsTreinoNivelCategoria.length > 0){
        return rsTreinoNivelCategoria
    } else {
        return false
    }
}
const selectTreinoNivelCategoriaByIdAcademia = async function(idAcademia){

    let sql = `
    select   tbl_treino_nivel_categoria.id,
                        tbl_treino.id as id_treino,
                        tbl_treino.nome,
                        tbl_treino.descricao,
                        tbl_treino.foto,
                        date_format(tbl_treino.data_criacao, '%d/%m/%y') as data_criacao,
                        tbl_nivel.nome as nome_nivel,
                        tbl_categoria_treino.nome as nome_categoria_treino,
                        tbl_academia.id as id_academia
                        
             from tbl_treino_nivel_categoria
                inner join tbl_treino
                    on tbl_treino_nivel_categoria.id_treino = tbl_treino.id
                inner join tbl_nivel
                    on tbl_treino_nivel_categoria.id_nivel = tbl_nivel.id
                inner join tbl_categoria_treino
                    on tbl_treino_nivel_categoria.id_categoria_treino = tbl_categoria_treino.id
                inner join tbl_academia
                    on tbl_treino_nivel_categoria.id_academia = tbl_academia.id 
                    
            where tbl_treino_nivel_categoria.id_academia = ${idAcademia}
            
            order by id desc

            `

    let rsTreinoNivelCategoria = await prisma.$queryRawUnsafe(sql)

    if(rsTreinoNivelCategoria.length > 0){
        return rsTreinoNivelCategoria
    } else {
        return false
    }
}

const selectTreinoNivelCategoriaByIdAluno = async function(idAluno){
    let sql = `
    select   tbl_treino_nivel_categoria.id,
                        tbl_treino.id as id_treino,
                        tbl_treino.nome,
                        tbl_treino.descricao,
                        tbl_treino.foto,
                        date_format(tbl_treino.data_criacao, '%d/%m/%y') as data_criacao,
                        tbl_nivel.nome as nome_nivel,
                        tbl_categoria_treino.nome as nome_categoria_treino,
                        tbl_academia.id as id_academia,
                        tbl_aluno_treino.id_aluno
                        
             from tbl_aluno_treino
				inner join tbl_treino_nivel_categoria
					on tbl_aluno_treino.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id
				inner join tbl_aluno
					on tbl_aluno_treino.id_aluno = tbl_aluno.id
				inner join tbl_treino
                    on tbl_treino_nivel_categoria.id_treino = tbl_treino.id
				inner join tbl_nivel
                    on tbl_treino_nivel_categoria.id_nivel = tbl_nivel.id
				inner join tbl_categoria_treino
                    on tbl_treino_nivel_categoria.id_categoria_treino = tbl_categoria_treino.id
				inner join tbl_academia
                    on tbl_treino_nivel_categoria.id_academia = tbl_academia.id
					
					
            where tbl_aluno_treino.id_aluno = ${idAluno}
            
            order by id desc;`

    let rsTreinoNivelCategoria = await prisma.$queryRawUnsafe(sql)

    if(rsTreinoNivelCategoria.length > 0){
        return rsTreinoNivelCategoria
    } else {
        return false
    }
}

const selectTreinoNivelCategoriaByIdAlunoAndIdAcademia = async function(idAluno, idAcademia){
    let sql = `
    select   tbl_treino_nivel_categoria.id,
                        tbl_treino.id as id_treino,
                        tbl_treino.nome,
                        tbl_treino.descricao,
                        tbl_treino.foto,
                        date_format(tbl_treino.data_criacao, '%d/%m/%y') as data_criacao,
                        tbl_nivel.nome as nome_nivel,
                        tbl_categoria_treino.nome as nome_categoria_treino,
                        tbl_academia.id as id_academia,
                        tbl_aluno_treino.id_aluno
                        
             from tbl_aluno_treino
				inner join tbl_treino_nivel_categoria
					on tbl_aluno_treino.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id
				inner join tbl_aluno
					on tbl_aluno_treino.id_aluno = tbl_aluno.id
				inner join tbl_treino
                    on tbl_treino_nivel_categoria.id_treino = tbl_treino.id
				inner join tbl_nivel
                    on tbl_treino_nivel_categoria.id_nivel = tbl_nivel.id
				inner join tbl_categoria_treino
                    on tbl_treino_nivel_categoria.id_categoria_treino = tbl_categoria_treino.id
				inner join tbl_academia
                    on tbl_treino_nivel_categoria.id_academia = tbl_academia.id
					
					
            where tbl_aluno_treino.id_aluno = ${idAluno} AND tbl_treino_nivel_categoria.id_academia = ${idAcademia}
            
            order by id desc;`

    let rsTreinoNivelCategoria = await prisma.$queryRawUnsafe(sql)

    if(rsTreinoNivelCategoria.length > 0){
        return rsTreinoNivelCategoria
    } else {
        return false
    }
}

const selectLastId = async function(){
    let sql = `select * from tbl_treino_nivel_categoria order by id desc limit 1;`

    let resultadoTreino = await prisma.$queryRawUnsafe(sql)

    if(resultadoTreino.length > 0){
        return resultadoTreino
    } else
        return false

}

module.exports = {
    selectTreinoNivelCategoriaById,
    selectLastId,
    selectTreinoNivelCategoriaByIdAcademia,
    selectTreinoNivelCategoriaByIdAluno,
    selectTreinoNivelCategoriaByIdAlunoAndIdAcademia,
    selectAlunosOnTreinoNivelCategoriaByIdAcademiaAndIdTreino
}