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

// Seleciona todas as academias do banco
const selectAllAcademias = async function(){

    let sql = `select   tbl_academia.id, tbl_academia.nome, tbl_academia.email, tbl_academia.senha,
    tbl_academia.telefone, tbl_academia.cnpj, tbl_academia.foto, tbl_academia.descricao,
    tbl_academia.cor_primaria, tbl_academia.cor_secundaria, tbl_academia.data_abertura,
    tbl_academia.razao_social, tbl_academia.facebook, tbl_academia.whatsapp, tbl_academia.instagram,
    tbl_academia.status,
    tbl_endereco.logradouro as logradouro, tbl_endereco.numero as numero, tbl_endereco.bairro as bairro, tbl_endereco.complemento as complemento,
    tbl_endereco.cep as cep
    
    from tbl_academia
        inner join tbl_endereco
            on tbl_endereco.id = tbl_academia.id_endereco;`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0){
        return resultadoAcademia
    } else{
        return false
    }
}
// Seleciona uma academia pelo seu id
const selectAcademiaById = async function(idAcademia){

    let sql = ` select tbl_academia.id, tbl_academia.nome, tbl_academia.email, tbl_academia.senha, tbl_academia.telefone, 
                tbl_academia.cnpj, tbl_academia.foto, tbl_academia.descricao, 
                tbl_academia.cor_primaria, tbl_academia.cor_secundaria, tbl_academia.data_abertura,
                tbl_academia.razao_social, tbl_academia.facebook, tbl_academia.whatsapp,
                tbl_academia.instagram, tbl_academia.status,
                tbl_endereco.logradouro, tbl_endereco.numero, tbl_endereco.bairro, tbl_endereco.complemento,
                tbl_endereco.cep, tbl_cidade.nome as cidade,
                tbl_estado.nome as estado
                
            from tbl_academia
                inner join tbl_endereco
                    on tbl_academia.id_endereco = tbl_endereco.id
                inner join tbl_cidade
                    on tbl_endereco.id_cidade = tbl_cidade.id
                inner join tbl_estado
                    on tbl_estado.id = tbl_cidade.id_estado
                    
                where tbl_academia.id = ${idAcademia}`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0)
        return resultadoAcademia
    else
        return false

}

// Seleciona uma academia pelo seu nome
const selectAcademiaByName = async function(nomeAcademia){
    let sql = ` select tbl_academia.id, tbl_academia.nome, tbl_academia.email, tbl_academia.senha, tbl_academia.telefone, 
            tbl_academia.cnpj, tbl_academia.foto, tbl_academia.descricao, 
            tbl_academia.cor_primaria, tbl_academia.cor_secundaria, tbl_academia.data_abertura,
            tbl_academia.razao_social, tbl_academia.facebook, tbl_academia.whatsapp,
            tbl_academia.instagram, tbl_academia.status,
            tbl_endereco.logradouro, tbl_endereco.numero, tbl_endereco.bairro, tbl_endereco.complemento,
            tbl_endereco.cep, tbl_cidade.nome as cidade,
            tbl_estado.nome as estado
            
        from tbl_academia
            inner join tbl_endereco
                on tbl_academia.id_endereco = tbl_endereco.id
            inner join tbl_cidade
                on tbl_endereco.id_cidade = tbl_cidade.id
            inner join tbl_estado
                on tbl_estado.id = tbl_cidade.id_estado
                
            where tbl_academia.nome like '%${nomeAcademia}%'`

    let resultadoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAcademia.length > 0)
        return resultadoAcademia
    else
        return false
}

// Insere uma nova academia
const insertAcademia = async function(dadosAcademia){
    let sql = `insert into tbl_academia (
        nome,
        email,
        senha,
        telefone,
        cnpj,
        foto,
        descricao,
        cor_primaria,
        cor_secundaria,
        data_abertura,
        razao_social,
        facebook,
        whatsapp,
        instagram,
        status
    ) values (
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
        ${dadosAcademia.facebook},
        ${dadosAcademia.whatsapp},
        ${dadosAcademia.instagram},
        '${dadosAcademia.status}',
    );`

    let resultadoAcademia = await prisma.$executeRawUnsafe(sql)

    if(resultadoAcademia)
        return
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
                status = '${dadosAcademia.status}'`

    let resultadoAcademia = await prisma.$executeRawUnsafe(sql)

    if(resultadoAcademia)
        return true
    else
        return false
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

module.exports = {
    selectAcademiaByPassword,
    selectAcademiaById,
    selectAllAcademias,
    insertAcademia,
    updateAcademia,
    deleteAcademia,
    selectLastId,
    selectAcademiaByName
}