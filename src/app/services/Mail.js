const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: viewPath,
    partialsDir: viewPath,
    defaultLayout: 'purchase'
  },
  viewPath,
  extName: '.hbs'
}

transport.use('compile', hbs(options))

module.exports = transport
