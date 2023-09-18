/***************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração do mailer para recuperação de conta
 * Data: 18/09/23
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************************/

const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5d9bc6ae55ed75",
      pass: "47fa56504b3ef8"
    }
  })

  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./mail/'),
    extName: '.html'
  }))

  module.exports = {
    transport
  }
