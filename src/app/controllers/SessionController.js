const User = require('../models/User')

class SessionControler {
  async store(req, res) {
    // Recupera o email e senha da requisição
    const { email, password } = req.body

    // Verifica se o email enviado na Requisição esta cadastrado
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ error: 'User not found' })
    }

    // Utiliza o method criado no Model de Usuario para testar a senha com hash
    if (!(await user.compareHash(password))) {
      res.status(400).json({ error: 'Invalid password' })
    }

    // Se tudo der certo, retorna o token e o ID do Usuario
    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionControler()
