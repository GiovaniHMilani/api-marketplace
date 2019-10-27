const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

// Rota de Criação e login do Usuario
routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

// Torna o token obrigatorio nas rotas abaixo
routes.use(authMiddleware)

/* ADS - Routes */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/* Purchase */
routes.post('/purchase', controllers.PurchaseController.store)

module.exports = routes
