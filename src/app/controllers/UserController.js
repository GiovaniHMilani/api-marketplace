const User = require('../models/User')

class UserController {
  async store(req, res) {
    // Recupera o email enviado pela requisição
    const { email } = req.body

    // Valida se o email enviado já não esta cadastrado
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Se não estiver, cria o usuario no banco e retorna o mesmo
    const user = await User.create(req.body)
    return res.json(user)
  }
}

module.exports = new UserController()
