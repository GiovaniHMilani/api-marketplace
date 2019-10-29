const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store(req, res) {
    /* Recupera o id do Ad e uma mensagem mandada atravez da requisição */
    const { ad, content } = req.body

    /* Verifica a existencia do Ad no mongo e busca os dados do usuario
    com o id fornecido pelo authMiddleware */
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
