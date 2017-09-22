import {faceIndetifyAppication} from '/controllers'
import express from 'express'
const router = express.Router()

// Face application - upload image and indentify face - service microsoftCognitive
router.route('/check-face')
  .post(faceIndetifyAppication.identify)

export default router
