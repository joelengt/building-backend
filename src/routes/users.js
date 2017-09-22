import {user} from '/controllers'
import express from 'express'
const router = express.Router()

router.route('/')
  .get(user.list)
  .post(user.create)

router.route('/:userID')
  .get(user.getById)
  .put(user.addPhoto)

export default router
