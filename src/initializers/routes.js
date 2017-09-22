import users from '/routes/users'

const debug = require('debug')('assistance-service:routes')

module.exports = (app) => {
  // api
  app.use('/api/users', users)

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
