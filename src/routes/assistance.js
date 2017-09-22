import {assistanceOverview} from '/controllers'
import express from 'express'
const router = express.Router()

router.route('/check-qr')
  .post(assistanceOverview.checkQR)

router.route('/reset')
  .put(assistanceOverview.reset)

export default router
