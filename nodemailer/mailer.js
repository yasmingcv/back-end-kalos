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
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./nodemailer/mail')
    },
    viewPath: path.resolve('./nodemailer/mail/'),
    extName: '.html'
  }))

  module.exports = {
    transport
  }