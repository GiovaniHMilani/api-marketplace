const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  // Recupera o Authorization do header da Requisição
  const authHeader = req.headers.authorization

  // Verifica se o token existe
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  /* Recupera apenas o token da requisição (Removendo o Bearer)
    e utiliza o jwt + pomisify para testar se o Token é valido */
  const [, token] = authHeader.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
