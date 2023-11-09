/*******************************************************************************
 * Objetivo: Arquivo de conexão com a tabela postagens do banco de dados
 * Data: 16/10/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******************************************************************************/


// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const { DateTime } = require('luxon')


// Seleciona todas as postagens da academia
const selectAllPostagensByIdAcademia = async function(idAcademia){

    let sql = `select   tbl_postagem.id, tbl_postagem.titulo, tbl_postagem.corpo, tbl_postagem.anexo, tbl_postagem.data, tbl_postagem.hora,
                        tbl_postagem.id_academia
                        
                        
                from tbl_postagem
                    inner join tbl_academia
                        on tbl_academia.id = tbl_postagem.id_academia
                        
                        where tbl_postagem.id_academia = ${idAcademia}
                        
                        order by id desc;`

    let resultadoPostagem = await prisma.$queryRawUnsafe(sql)

    if(resultadoPostagem.length > 0)
        return resultadoPostagem
    else
        return false
}

// Seleciona uma postagem pelo ID
const selectPostagemById = async function(idPostagem){

    let sql = `select tbl_postagem.*
        
        from tbl_postagem
            inner join tbl_academia
                on tbl_academia.id = tbl_postagem.id_academia where tbl_postagem.id = ${idPostagem}`

    let resultadoPostagem = await prisma.$queryRawUnsafe(sql)

    if(resultadoPostagem.length > 0){
        return resultadoPostagem[0]
    } else {
        return false
    }
}
// Insere uma nova postagem
const insertPostagem = async function(dadosPostagem){
    const timeZone = 'America/Sao_Paulo'
    const now = DateTime.now().setZone(timeZone)

    console.log(now);

    let sql = `insert into tbl_postagem (
        titulo,
        corpo,
        anexo,
        data,
        hora,
        id_academia
    ) values (
        '${dadosPostagem.titulo}',
        '${dadosPostagem.corpo}',
        ${dadosPostagem.anexo},
        '${now.toFormat('yyyy-MM-dd')}',
        '${now.toFormat('HH:mm:ss')}',
        ${dadosPostagem.id_academia}
    );`

    let resultadoPostagem = await prisma.$executeRawUnsafe(sql)

    if(resultadoPostagem)
        return true
    else
        return false
}

// Atualiza os dados de uma postagem
const updatePostagem = async function(dadosPostagem){
    const timeZone = 'America/Sao_Paulo'
    const now = DateTime.now().setZone(timeZone)

    console.log(now.toFormat('HH:mm:ss'));

    let sql = ` update tbl_postagem set
                titulo = '${dadosPostagem.titulo}',
                corpo = '${dadosPostagem.corpo}',
                anexo = ${dadosPostagem.anexo},
                hora = '${now.toFormat('HH:mm:ss')}',
                data = '${now.toFormat('yyyy-MM-dd')}',
                id_academia = ${dadosPostagem.id_academia}
                
                where id = ${dadosPostagem.id}`

    let resultadoPostagem = await prisma.$executeRawUnsafe(sql)

    if(resultadoPostagem)
        return true
    else
        return false
}

// Deleta uma postagem
const deletePostagem = async function(idPostagem){
    let sql = `delete from tbl_postagem where id = ${idPostagem}`

    let resultadoPostagem = await prisma.$queryRawUnsafe(sql)

    if(resultadoPostagem)
        return true
    else
        return false
}


const selectLastId = async function(){
    let sql = `select * from tbl_postagem order by id desc limit 1;`

    let resultadoPostagem = await prisma.$queryRawUnsafe(sql)

    if(resultadoPostagem.length > 0){
        return resultadoPostagem
    } else
        return false

}

module.exports = {
    selectAllPostagensByIdAcademia,
    insertPostagem,
    updatePostagem,
    deletePostagem,
    selectLastId,
    selectPostagemById
}

