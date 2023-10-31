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

var redis = require('../../middleware/redisConfig.js')

// Seleciona todos os alunos
const selectAllAlunos = async function (){

    let sql = `
    select  tbl_aluno.*, tbl_genero.nome as genero

    from tbl_aluno
        inner join tbl_genero
            on tbl_genero.id = tbl_aluno.id_genero;
`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0) {
        return resultadoAluno
    } else{
        return false
    }
}

// Seleciona um aluno pelo seu id
const selectAlunoById = async function(idAluno){

    // const userRedis = await redis.getRedis(`aluno-${idAluno}`);
    // const user = JSON.parse(userRedis)

    let sql = `select   tbl_aluno.*, tbl_genero.nome as genero
    
    from tbl_aluno
        inner join tbl_genero
            on tbl_genero.id = tbl_aluno.id_genero where tbl_aluno.id = ${idAluno}`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0)
        return resultadoAluno
    else
        return false
}

// Seleciona um aluno pelo seu nome
const selectAlunoByName = async function(nomeAluno){

    let sql = `select * from tbl_aluno where nome like '%${nomeAluno}%'`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0)
        return resultadoAluno
    else
        return false
}

// Seleciona um aluno pelo email
const selectAlunoByEmail = async function(emailAluno){

    let sql = `select * from tbl_aluno where email = "${emailAluno}"`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0)
        return resultadoAluno[0]
    else
        return false
}

const updateTokenAndExpiresByEmail = async function (email, token, expires){
    let sql = `update tbl_aluno set 
        token = '${token}',
        expiracao_token = '${expires}'
        
        where tbl_aluno.email = '${email}'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus){
        return true
    } else {
        return false
    }
}

const selectAlunoByTokenAndEmail = async function (email, token){
    let sql = `select * from tbl_aluno where email = '${email}' and token = '${token}'`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    } else {
        return false
    }
}

// Insert de dados do aluno
const insertAluno = async function (dadosAluno){
    let sql = `insert into tbl_aluno (
        nome,
        data_nascimento,
        telefone,
        email,
        foto,
        senha,
        cpf,
        questao_condicao_medica,
        questao_lesoes,
        questao_medicamento,
        peso,
        altura,
        objetivo,
        id_genero
    ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.data_nascimento}',
        '${dadosAluno.telefone}',
        '${dadosAluno.email}',
        '${dadosAluno.foto}',
        '${dadosAluno.senha}',
        '${dadosAluno.cpf}',
        '${dadosAluno.questao_condicao_medica}',
        '${dadosAluno.questao_lesoes}',
        '${dadosAluno.questao_medicamento}',
        '${dadosAluno.peso}',
        '${dadosAluno.altura}',
        '${dadosAluno.objetivo}',
        ${dadosAluno.id_genero}

    );`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno)
        return true
    else
        return false
}

// Atualiza os dados do aluno
const updateAluno = async function(dadosAluno){
    
    let sql = ` update tbl_aluno set
                nome = '${dadosAluno.nome}',
                data_nascimento = '${dadosAluno.data_nascimento}',
                telefone = '${dadosAluno.telefone}',
                email = '${dadosAluno.email}',
                foto = '${dadosAluno.foto}',
                senha = '${dadosAluno.senha}',
                cpf = '${dadosAluno.cpf}',
                questao_condicao_medica = '${dadosAluno.questao_condicao_medica}',
                questao_lesoes = '${dadosAluno.questao_lesoes}',
                questao_medicamento = '${dadosAluno.questao_medicamento}',
                peso = '${dadosAluno.peso}',
                altura = '${dadosAluno.altura}',
                objetivo = '${dadosAluno.objetivo}',
                id_genero = ${dadosAluno.id_genero} where id = ${dadosAluno.id}`


    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    if (resultadoAluno)
        return true
    else
        return false
}

// Deleta um aluno
const deleteAluno = async function(idAluno){
    let sql = `delete from tbl_aluno where id = ${idAluno}`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno)
        return true
    else
        return false
    
}

const selectLastId = async function(){
    let sql = `select * from tbl_aluno order by id desc limit 1;`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0){
        return resultadoAluno
    } else
        return false

}

const selectLast5Alunos = async function(){
    let sql = `select * from tbl_aluno order by id desc limit 5;`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0){
        return resultadoAluno
    } else {
        return false
    }
}

const selectAlunoByPassword = async function (dadosAluno){
    let sql  = `select * from tbl_aluno 
                    where email = '${dadosAluno.email}'
                    and
                    senha = '${dadosAluno.senha}'`


    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    } else {
        return false
    }
}

const updatePassword = async function(email, novaSenha){
    let sql = `update tbl_aluno set senha = '${novaSenha}' where email = '${email}'`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno){
        return true
    } else {
        return false
    }
}

module.exports = {
    selectAllAlunos,
    selectAlunoById,
    selectAlunoByName,
    selectAlunoByEmail,
    insertAluno,
    deleteAluno,
    updateAluno,
    selectLastId,
    selectAlunoByPassword,
    updateTokenAndExpiresByEmail,
    selectAlunoByTokenAndEmail,
    updatePassword,
    selectLast5Alunos
}