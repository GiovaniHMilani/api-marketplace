const Mail = require('../services/Mail')

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { ad, user, content } = job.data

    /* Configuração do Conteudo do email */
    await Mail.sendMail({
      from: '"Giovani Milani" <giovani.milani@allcomsistemas.com.br>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad: ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
