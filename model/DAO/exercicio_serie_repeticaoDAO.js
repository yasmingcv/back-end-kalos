/******
 * Objetivo: Arquivo de conexão com a tabela exercicio_serie_repeticao do banco de dados
 * Data: 26/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


const selectExercicioSerieRepeticaoByID = async function(idESR){

    let sql = `
    select   tbl_exercicio_serie_repeticao.id as id_exercicio_serie_repeticao,
                    tbl_exercicio.id as id_exercicio,
                    tbl_exercicio.nome,
                    tbl_exercicio.descricao,
                    tbl_exercicio.anexo,
                    tbl_serie.numero as series,
                    tbl_repeticao.numero as repeticoes,
                    tbl_treino_nivel_categoria.id as id_treino_nivel_categoria
             
            from tbl_exercicio_serie_repeticao
                inner join tbl_exercicio
                    on tbl_exercicio_serie_repeticao.id_exercicio = tbl_exercicio.id
                inner join tbl_serie
                    on tbl_exercicio_serie_repeticao.id_serie = tbl_serie.id
                inner join tbl_repeticao
                    on tbl_exercicio_serie_repeticao.id_repeticao = tbl_repeticao.id
                inner join tbl_treino_nivel_categoria
                    on tbl_exercicio_serie_repeticao.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id

            where tbl_exercicio_serie_repeticao.id = ${idESR};
            `

    let rsExercicioSerieRepeticao = await prisma.$queryRawUnsafe(sql)

    if(rsExercicioSerieRepeticao.length > 0){
        return rsExercicioSerieRepeticao[0]
    } else {
        return false
    }
}

const selectExercicioSerieRepeticaoByIDTreinoNivelCategoria = async function(id){

    let sql = `
    select   tbl_exercicio_serie_repeticao.id as id_exercicio_serie_repeticao,
                    tbl_exercicio.id as id_exercicio,
                    tbl_exercicio.nome,
                    tbl_exercicio.descricao,
                    tbl_exercicio.anexo,
                    tbl_serie.numero as series,
                    tbl_repeticao.numero as repeticoes,
                    tbl_treino_nivel_categoria.id as id_treino_nivel_categoria
             
            from tbl_exercicio_serie_repeticao
                inner join tbl_exercicio
                    on tbl_exercicio_serie_repeticao.id_exercicio = tbl_exercicio.id
                inner join tbl_serie
                    on tbl_exercicio_serie_repeticao.id_serie = tbl_serie.id
                inner join tbl_repeticao
                    on tbl_exercicio_serie_repeticao.id_repeticao = tbl_repeticao.id
                inner join tbl_treino_nivel_categoria
                    on tbl_exercicio_serie_repeticao.id_treino_nivel_categoria = tbl_treino_nivel_categoria.id

            where tbl_treino_nivel_categoria.id = ${id};
            `

    let rsExercicioSerieRepeticao = await prisma.$queryRawUnsafe(sql)

    if(rsExercicioSerieRepeticao.length > 0){
        return rsExercicioSerieRepeticao
    } else {
        return false
    }
}


module.exports = {
    selectExercicioSerieRepeticaoByID,
    selectExercicioSerieRepeticaoByIDTreinoNivelCategoria
}