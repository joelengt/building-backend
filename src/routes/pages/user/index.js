import express from 'express'
import Users from '/models/users'

const router = express.Router()
const debug = require('debug')('assistance-service:pages:users')

router.get('/list', async (req, res) => {
  try {
    debug('tock')
    let users = await Users.find()

    return res.render('./user/list', {
      users: users
    })
  } catch (err) {
    let payload = {success: false, error: err}
    res['500'](payload, 'Error server')
  }
})

router.get('/:userID', async (req, res) => {
  let userID = req.params.userID
  try {
    debug('tock')
    let user = await Users.findById(userID).populate('photo')

    if (!user) {
      let payload = {success: false, item: null}
      return res['404'](payload, 'users not registered on db')
    }
    debug('Fotos del usuario', user)
    return res.render('./user/item', {
      user: user
    })
  } catch (err) {
    let payload = {success: false, error: err}
    res['500'](payload, 'Error server')
  }
})

export default router
