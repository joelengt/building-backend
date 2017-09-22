import users from '/routes/users'
import menu from '/routes/menu'
import orders from '/routes/orders'
import clients from '/routes/clients'

const debug = require('debug')('assistance-service:routes')

module.exports = (app) => {
  // api
  app.use('/api/users', users)
  app.use('/api/menu', menu)
  app.use('/api/orders', orders)
  app.use('/api/clients', clients)

  // Middleware express 401
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...')
    }
  })

  // Middleware express 404
  app.use((req, res, next) => {
    res.status(404).send('404 : Not Found')
  })

  // Middleware express 500
  app.use((err, req, res, next) => {
    res.status(500).send('500 : Server Error')
  })
}
