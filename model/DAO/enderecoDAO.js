/******
 * Objetivo: Arquivo de conexão com a tabela aluno do banco de dados
 * Data: 06/09/23
 * Autores: Artur Alves
 * Versão: 1.0
 ******/


// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectEnderecoById = async function(idEndereco){

    let sql = `select   tbl_endereco.logradouro, tbl_endereco.numero, tbl_endereco.bairro,
                        tbl_endereco.complemento, tbl_endereco.cep, tbl_cidade.nome as cidade
                        
                        from tbl_endereco
                            inner join tbl_cidade
                                on tbl_cidade.id = tbl_endereco.id_cidade where tbl_endereco.id = ${idEndereco}`

    let resultadoEndereco = await prisma.$queryRawUnsafe(sql)

    if(resultadoEndereco.length > 0)
        return resultadoEndereco
    else
        return false

}

const insertEndereco = async function(dadosEndereco){
    let sql = `insert into tbl_endereco (
        logradouro,
        numero,
        bairro,
        complemento,
        cep
    ) values (
        '${dadosEndereco.logradouro}',
        '${dadosEndereco.numero}',
        '${dadosEndereco.bairro}',
        '${dadosEndereco.complemento}',
        '${dadosEndereco.cep}',
    );`

    let resultadoEndereco = await prisma.$executeRawUnsafe(sql)

    if(resultadoEndereco)
        return true
    else 
        return false
}

const updateEndereco = async function(dadosEndereco){

    let sql = ` update tbl_endereco set
                logradouro = '${dadosEndereco.logradouro}',
                numero = '${dadosEndereco.numero}',
                bairro = '${dadosEndereco.bairro}',
                complemento = '${dadosEndereco.complemento}',
                cep = '${dadosEndereco.cep}'`


    let resultadoEndereco = await prisma.$executeRawUnsafe(sql)

    if(resultadoEndereco)
        return true
    else
        return false
}

const deleteEndereco = async function(idEndereco){
    let sql = `delete from tbl_endereco where id = ${idEndereco}`

    let resultadoEndereco = await prisma.$queryRawUnsafe(sql)

    if(resultadoEndereco)
        return true
    else
        return false
}

module.exports = {
    selectEnderecoById,
    insertEndereco,
    updateEndereco,
    deleteEndereco
}