const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store(req, res) {
    /* Recupera o id do Ad e uma mensagem mandada atravez da requisição */
    const { ad, content } = req.body

    /* Verifica a existencia do Ad no mongo e busca os dados do usuario
    com o id fornecido pelo authMiddleware */
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    /* Configuração do Conteudo do email */
    await Mail.sendMail({
      from: '"Giovani Milani" <giovani.milani@allcomsistemas.com.br>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: '<p> Teste </p>'
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
