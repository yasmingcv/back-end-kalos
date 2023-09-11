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


// Seleciona todos os alunos
const selectAllAlunos = async function (){

    let sql = `
    select  tbl_aluno.id, tbl_aluno.nome, tbl_aluno.data_nascimento, tbl_aluno.telefone,
    tbl_aluno.email, tbl_aluno.foto, tbl_aluno.cpf, tbl_aluno.objetivo,
    tbl_aluno.questao_condicao_medica, tbl_aluno.questao_lesoes, tbl_aluno.questao_medicamento,
    tbl_aluno.peso, tbl_aluno.altura, tbl_genero.nome as genero

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

    let sql = `select   tbl_aluno.id, tbl_aluno.nome, tbl_aluno.data_nascimento, tbl_aluno.telefone,
    tbl_aluno.email, tbl_aluno.foto, tbl_aluno.cpf, tbl_aluno.objetivo,
    tbl_aluno.questao_condicao_medica, tbl_aluno.questao_lesoes, tbl_aluno.questao_medicamento,
    tbl_aluno.peso, tbl_aluno.altura, tbl_genero.nome as genero
    
    from tbl_aluno
        inner join tbl_genero
            on tbl_genero.id = tbl_aluno.id_genero where tbl_aluno.id = ${idAluno}`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0)
        return resultadoAluno[0]
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

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

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

module.exports = {
    selectAllAlunos,
    selectAlunoById,
    selectAlunoByName,
    insertAluno,
    deleteAluno,
    updateAluno,
    selectLastId,
    selectAlunoByPassword
}