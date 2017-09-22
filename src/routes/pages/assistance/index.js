import express from 'express'
import Users from '/models/users'

const debug = require('debug')('assistance-service:pages:assistance')
const router = express.Router()

router.get('/list/check', async (req, res) => {
  try {
    debug('tock')
    let users = await Users.find({'statusConnectQR': true, 'statusConnectFace': true})

    return res.render('./assistance/status', {
      users: users
    })
  } catch (err) {
    let payload = {success: false, error: err}
    res['500'](payload, 'Error server')
  }
})

export default router
