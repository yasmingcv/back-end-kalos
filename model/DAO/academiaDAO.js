/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das academias no banco de dados
 * Data: 05/09/23
 * Autores: Yasmin Gonçalves e Artur Alves
 * Versão: 1.0
 ****************************************************************************************************/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


//const crypto = require('crypto')
//const mailer = require('../../nodemailer/mailer.js')

// Seleciona todas as academias do banco
const selectAllAcademias = async function(){

    let sql = `select tbl_academia.*, tbl_academia_categoria.id_categoria,
    tbl_categoria.nome as categoria, tbl_endereco.id as id_endereco,
    tbl_endereco.logradouro, tbl_endereco.numero as numero_endereco, tbl_endereco.complemento,
    tbl_endereco.cep, tbl_endereco.cidade, tbl_endereco.estado
    
    from tbl_academia
        inner join tbl_academia_categoria
            on tbl_academia_categoria.id_academia = tbl_academia.id
        inner join tbl_categoria
            on tbl_categoria.id = tbl_academia_categoria.id_categoria
        inner join tbl_endereco
            on tbl_endereco.id = tbl_academia.id_endereco`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0){
        return resultadoAcademia
    } else{
        return false
    }
}
// Seleciona uma academia pelo seu id
const selectAcademiaById = async function(idAcademia){

    let sql = ` select tbl_academia.*, tbl_academia_categoria.id_categoria,
    tbl_categoria.nome as categoria, tbl_endereco.id as id_endereco,
    tbl_endereco.logradouro, tbl_endereco.numero as numero_endereco, tbl_endereco.complemento,
    tbl_endereco.cep, tbl_endereco.cidade, tbl_endereco.estado
    
    from tbl_academia
        inner join tbl_academia_categoria
            on tbl_academia_categoria.id_academia = tbl_academia.id
        inner join tbl_categoria
            on tbl_categoria.id = tbl_academia_categoria.id_categoria
        inner join tbl_endereco
            on tbl_endereco.id = tbl_academia.id_endereco
              
              where tbl_academia.id = ${idAcademia}`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0)
        return resultadoAcademia[0]
    else
        return false

}

// Seleciona uma academia pelo seu nome
const selectAcademiaByName = async function(nomeAcademia){
    let sql = ` select tbl_academia.*, tbl_academia_categoria.id_categoria,
    tbl_categoria.nome as categoria, tbl_endereco.id as id_endereco,
    tbl_endereco.logradouro, tbl_endereco.numero as numero_endereco, tbl_endereco.complemento,
    tbl_endereco.cep, tbl_endereco.cidade, tbl_endereco.estado
    
    from tbl_academia
        inner join tbl_academia_categoria
            on tbl_academia_categoria.id_academia = tbl_academia.id
        inner join tbl_categoria
            on tbl_categoria.id = tbl_academia_categoria.id_categoria
        inner join tbl_endereco
            on tbl_endereco.id = tbl_academia.id_endereco
                
            where tbl_academia.nome like '%${nomeAcademia}%'`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0)
        return resultadoAcademia
    else
        return false
}

const inserirTag = async function(tag){
    let sql = `insert into tmp_tbl_tags (id_tag) values (${tag})`

    let rsTempTag = await prisma.$executeRawUnsafe(sql)

    if(rsTempTag)
        return true
    else
        return false
}

// Insere uma nova academia
const insertAcademia = async function(dadosAcademia){
    let sqlCriaTempTable = 'create temporary table tmp_tbl_tags (id_tag int)'

    await prisma.$executeRawUnsafe(sqlCriaTempTable)

    for (const tag of dadosAcademia.tags) {
        await inserirTag(tag);
    }

    let sql = `call procInsertAcademiaEnderecoCategoriaTags(
        '${dadosAcademia.nome}',
        '${dadosAcademia.email}',
        '${dadosAcademia.senha}',
        '${dadosAcademia.telefone}',
        '${dadosAcademia.cnpj}',
        '${dadosAcademia.foto}',
        '${dadosAcademia.descricao}',
        '${dadosAcademia.cor_primaria}',
        '${dadosAcademia.cor_secundaria}',
        '${dadosAcademia.data_abertura}',
        '${dadosAcademia.razao_social}',
        '${dadosAcademia.facebook}',
        '${dadosAcademia.whatsapp}',
        '${dadosAcademia.instagram}',
        '${dadosAcademia.logradouro}',
        '${dadosAcademia.numero}',
        '${dadosAcademia.bairro}',
        '${dadosAcademia.complemento}',
        '${dadosAcademia.cep}',
        '${dadosAcademia.cidade}',
        '${dadosAcademia.estado}',
        ${dadosAcademia.id_categoria},
        '${dadosAcademia.status}');`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    console.log(resultadoAcademia);

    if(resultadoAcademia.length == 0)
        return true
    else
        return false
}
// Atualiza os dados de uma academia
const updateAcademia = async function(dadosAcademia){

    let sql = ` update tbl_academia set
                nome = '${dadosAcademia.nome}',
                email = '${dadosAcademia.email}',
                senha = '${dadosAcademia.senha}',
                telefone = '${dadosAcademia.telefone}',
                cnpj = '${dadosAcademia.cnpj}',
                foto = '${dadosAcademia.foto}',
                descricao = '${dadosAcademia.descricao}',
                cor_primaria = '${dadosAcademia.cor_primaria}',
                cor_secundaria = '${dadosAcademia.cor_secundaria}',
                data_abertura = '${dadosAcademia.data_abertura}',
                razao_social = '${dadosAcademia.razao_social}',
                facebook = ${dadosAcademia.facebook},
                whatsapp = ${dadosAcademia.whatsapp},
                instagram = ${dadosAcademia.instagram},
                status = ${dadosAcademia.status},
                id_endereco = ${dadosAcademia.id_endereco}
                where id = ${dadosAcademia.id}`

    let resultadoAcademia = await prisma.$executeRawUnsafe(sql)

    if(!resultadoAcademia){
        return false
    }else{
        return true
    }
}
// Deleta uma academia do banco
const deleteAcademia = async function(idAcademia){
    let sql = `delete from tbl_academia where id = ${idAcademia}`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia)
        return true
    else
        return false

}
// Seleciona o ultimo ID inserido no banco
const selectLastId = async function(){
    let sql = `select * from tbl_academia order by id desc limit 1;`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0){
        return resultadoAcademia
    } else {
        return false
    }
}

// Seleciona uma academia pelo email e senha
const selectAcademiaByPassword = async function (dadosAcademia){
    let sql  = `select * from tbl_academia 
                    where email = '${dadosAcademia.email}'
                    and
                    senha = '${dadosAcademia.senha}'`


    let rsAcademia = await prisma.$queryRawUnsafe(sql)

    if(rsAcademia.length > 0){
        return rsAcademia
    } else {
        return false
    }
}

const selectAcademiaByEmail = async function (email){
    let sql = `select * from tbl_academia where email = '${email}'`

    let resultadoDadosAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosAcademia.length > 0){
        return resultadoDadosAcademia
    } else {
        return false
    }
}



module.exports = {
    selectAcademiaByPassword,
    selectAcademiaById,
    selectAllAcademias,
    insertAcademia,
    updateAcademia,
    deleteAcademia,
    selectLastId,
    selectAcademiaByName,
    selectAcademiaByEmail
}