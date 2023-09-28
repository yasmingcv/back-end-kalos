/*****************************************************************************************
 * Objetivo: Arquivo responsável pelo envio de emails da academia
 * Data: 28/09/2023
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

var message = require('../../controller/modulo/config')
var academiaDAO = require('../../model/DAO/academiaDAO')


const crypto = require('crypto')
const { DateTime } = require('luxon')

const SMTP_CONFIG = require('../../nodemailer2.0/smtp')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls: {
        rejectUnauthorized: false
    },
})

//Envia para o email informado o token para redefinição de senha
const esqueciASenha = async function (dados) {
    var academia = await academiaDAO.selectAcademiaByEmail(dados.email)

    //Verifica se o email é cadastrado na tabela de academias
    if (academia != false) {
        const timeZone = 'America/Sao_Paulo'
        const now = DateTime.now().setZone(timeZone)

        //Adiciona meia hora ao tempo atual para definir o tempo de expiração no banco
        const expires = now.plus({ minutes: 30 }).toFormat('yyyy-MM-dd HH:mm:ss')
        const token = crypto.randomInt(10000, 99999)

        const mailSent = transporter.sendMail({
            html: `
                <p>Olá,</p>
                <p>Recebemos uma solicitação para redefinir a senha da sua conta na Kalos Corporation. Para concluir o processo de recuperação de conta, utilize o código de verificação abaixo:</p>
                <p><strong>Código de Verificação: ${token}</strong></p>
                <p>Este código é válido por 30 minutos. Por favor, não compartilhe com ninguém por motivos de segurança.</p>
                <p>Se você não solicitou esta recuperação de senha, ignore este e-mail.</p>
                <p>Caso tenha alguma dúvida ou precise de assistência, não hesite em nos contatar através deste e-mail.</p>
                <p>Atenciosamente,<br>Equipe de Suporte Kalos Corporation</p>
            `,
            subject: 'Recuperação de conta - Kalos Corporation',
            from: 'Kalos Corporation <kaloscorporation@gmail.com>',
            to: dados.email
        })

        if (mailSent) {
            await academiaDAO.updateTokenAndExpiresByEmail(dados.email, token, expires)

            return message.SUCCESS_REQUEST
        } else {
            return message.ERROR_INTERNAL_SERVER
        }



    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Verifica se o token informado é válido
const verificarToken = async function (dadosAcademia) {
    if (dadosAcademia.token == undefined || dadosAcademia.token == null ||
        dadosAcademia.email == undefined || dadosAcademia.email == null || !isNaN(dadosAcademia.email)) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let rsAcademia = await academiaDAO.selectAcademiaByTokenAndEmail(dadosAcademia.email, dadosAcademia.token)

        if (rsAcademia) {
            const timeZone = 'America/Sao_Paulo'
            const dataAtual = DateTime.now().setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss')

            const dataExpiracao = new Date(rsAcademia[0].expiracao_token).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')

            //Verifica se a data de expiração é maior que a data atual. Se for, o token ainda é válido, se não, o token é invalido
            if (dataExpiracao > dataAtual) {
                return message.SUCCESS_REQUEST

            } else {
                return message.ERROR_INVALID_TOKEN

            }
        } else {
            return message.ERROR_INVALID_TOKEN

        }

    }
}

module.exports = {
    esqueciASenha,
    verificarToken
}