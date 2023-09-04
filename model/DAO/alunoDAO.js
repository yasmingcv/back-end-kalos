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


// Insert de dados do aluno
const insertAluno = async function (dadosAluno){
    let sql = `insert into tbl_aluno (
        nome,
        data_nascimento,
        telefone,
        email,
        senha,
        cpf,
        questao_condicao_medica,
        questao_lesoes,
        questao_medicamento,
        peso,
        altura,
        objetivo
    ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.data_nascimento}',
        '${dadosAluno.telefone}',
        '${dadosAluno.email}',
        '${dadosAluno.senha}',
        '${dadosAluno.cpf}',
        '${dadosAluno.questao_condicao_medica}',
        '${dadosAluno.questao_lesao}',
        '${dadosAluno.questao_medicamento}',
        '${dadosAluno.peso}',
        '${dadosAluno.altura}',
        '${dadosAluno.objetivo}',

    );`

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    if(resultadoAluno)
        return true
    else
        return false
}

// Seleciona todos os alunos
const selectAllAlunos = async function (){
    let sql = `
    select  tbl_aluno.nome, tbl_aluno.data_nascimento, tbl_aluno.telefone,
            tbl_aluno.email, tbl_aluno.foto, tbl_aluno.cpf, tbl_aluno_objetivo
            tbl_aluno.questao_condicao_medica, tbl_aluno.questao_lesoes, tbl_aluno.questao_medicamento,
            tbl_aluno.peso, tbl_aluno.altura

            from tbl_aluno
                inner join tbl_aluno_academia
                    on tbl_aluno.id = tbl_aluno_academia.id_aluno;
    `
}
