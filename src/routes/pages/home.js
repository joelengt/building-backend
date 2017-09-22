import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  console.log('Datos!')
  // let payload =
  res.render('./facetest')
})

export default router
