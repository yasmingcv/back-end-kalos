/***************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados da tabela aluno_academia no banco de dados
 * Data: 17/09/23
 * Autores: Yasmin Gonçalves e Artur Alves
 * Versão: 1.0
 ****************************************************************************************************/

// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()

const selectAllAlunosByIdAcademia = async function (idAcademia){

    let sql = `select tbl_aluno_academia.id_academia,
                      tbl_aluno.*
                      
                    from tbl_aluno_academia
                    inner join tbl_aluno
                        on tbl_aluno_academia.id_aluno = tbl_aluno.id
                    inner join tbl_academia
                        on tbl_aluno_academia.id_academia = tbl_academia.id
                        
                    where tbl_aluno_academia.id_academia = ${idAcademia};`

    let rsAlunoAcademia = await prisma.$queryRawUnsafe(sql)

    if(rsAlunoAcademia.length > 0)
        return rsAlunoAcademia
    else
        return false
}
const selectAlunoAcademiaById = async function (idAlunoAcademia) {

    let sql = `select   tbl_aluno.*,
    tbl_nivel.nome as nivel_experiencia,
    tbl_qualidade_do_sono.qualidade,
    tbl_academia.id as id_academia, tbl_academia.nome as nome_academia
    
    from tbl_aluno
    inner join tbl_nivel
        on tbl_aluno.id_nivel_experiencia = tbl_nivel.id
    inner join tbl_qualidade_do_sono
        on tbl_aluno.id_qualidade_do_sono = tbl_qualidade_do_sono.id
    inner join tbl_aluno_academia
        on tbl_aluno.id = tbl_aluno_academia.id_aluno
    inner join tbl_academia
        on tbl_academia.id = tbl_aluno_academia.id_academia
        where tbl_aluno.id = ${idAlunoAcademia};`

    let resultadoAlunoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAlunoAcademia.length > 0)
        return resultadoAlunoAcademia[0]
    else
        return false
}

const selectAcademiasAlunoByID = async function(idAluno){
    let sql = `select	tbl_aluno_academia.id_aluno,
                        tbl_academia.*,
                        tbl_endereco.logradouro, tbl_endereco.numero, tbl_endereco.cidade, tbl_endereco.estado, tbl_endereco.bairro,
                        tbl_categoria.nome as categoria

                        from tbl_aluno_academia
                        inner join tbl_aluno
                            on tbl_aluno_academia.id_aluno = tbl_aluno.id
                        inner join tbl_academia
                            on tbl_aluno_academia.id_academia = tbl_academia.id
                        inner join tbl_endereco
                            on tbl_academia.id_endereco = tbl_endereco.id
                        inner join tbl_academia_categoria
                            on tbl_academia_categoria.id_academia = tbl_academia.id
                        inner join tbl_categoria
                            on tbl_academia_categoria.id_categoria = tbl_categoria.id
                        where tbl_aluno_academia.id_aluno = ${idAluno};`

    let resultadoAlunoAcademia = await prisma.$queryRawUnsafe(sql)

    if(resultadoAlunoAcademia.length > 0)
        return resultadoAlunoAcademia
    else
        return false
}

const insertAlunoAcademia = async function (dadosAlunoAcademia) {

    let sql = ` insert into tbl_aluno_academia (
                id_academia,
                id_aluno
            ) values (
                ${dadosAlunoAcademia.id_academia},
                ${dadosAlunoAcademia.id_aluno}
                );`

    let resultadoAlunoAcademia = await prisma.$executeRawUnsafe(sql)

    if (resultadoAlunoAcademia)
        return true
    else
        return false
}

const updateAlunoAcademia = async function (dadosAlunoAcademia) {

    let sql = `  update tbl_aluno set
                    frequencia_cardiaca = ${dadosAlunoAcademia.frequencia_cardiaca},
                    tempo_em_pe = '${dadosAlunoAcademia.tempo_em_pe}',
                    rotina_regular = '${dadosAlunoAcademia.rotina_regular}',
                    frequencia_treino_semanal = ${dadosAlunoAcademia.frequencia_treino_semanal},
                    id_nivel_experiencia = ${dadosAlunoAcademia.id_nivel_experiencia},
                    id_qualidade_do_sono = ${dadosAlunoAcademia.id_qualidade_do_sono}
                    where id = ${dadosAlunoAcademia.id_aluno};`

    let resultadoAlunoAcademia = await prisma.$executeRawUnsafe(sql)

    if (resultadoAlunoAcademia)
        return true
    else
        return false

}

const deleteAlunoFromAcademia = async function(idAluno, idAcademia){

    let sql = `delete from tbl_aluno_academia where tbl_aluno_academia.id_aluno = ${idAluno} AND tbl_aluno_academia.id_academia = ${idAcademia}`

    let resultadoAlunoAcademia = await prisma.$executeRawUnsafe(sql)

    if(resultadoAlunoAcademia)
        return true
    else
        return false
}
const selectLast5Alunos = async function(idAcademia){
    let sql = `select tbl_aluno.*
	    from tbl_aluno
		    inner join tbl_aluno_academia
			    on tbl_aluno.id = tbl_aluno_academia.id_aluno

	    where tbl_aluno_academia.id_academia = ${idAcademia}

	    order by tbl_aluno.id desc limit 5;`

    let resultadoAlunos = await prisma.$queryRawUnsafe(sql)

    if(resultadoAlunos.length > 0){
        return resultadoAlunos
    } else {
        return false
    }
}

module.exports = {
    insertAlunoAcademia,
    updateAlunoAcademia,
    selectAlunoAcademiaById,
    selectLast5Alunos,
    selectAcademiasAlunoByID,
    selectAllAlunosByIdAcademia,
    deleteAlunoFromAcademia
}
