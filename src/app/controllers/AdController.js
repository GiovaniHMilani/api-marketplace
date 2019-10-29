const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    /* Inicia a variavel Filter,
     onde sera contido todos os filtros da requisição */
    const filters = {}

    /* Define um filtro para preço minimo/maximo
      utilizando o $gte/$lte */
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}
      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    /* Define um filtro pelo titulo do anuncio */
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    /* Traz todos os ads em forma de paginação */
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  async show(req, res) {
    /* Procura um ad expecifico pelo ID */
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  async store(req, res) {
    /* Cria um novo AD utilizando o userId fornecido pelo authMiddleware */
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update(req, res) {
    /* Utiliza o metodo findByIdAndUpdate do mongoose para procurar um registro 
    e alteralo */
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy(req, res) {
    /* Utiliza o metodo findByIdAndDelete do mongoose para procurar um registro 
    e deletalo */
    await Ad.findByIdAndRemove(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
