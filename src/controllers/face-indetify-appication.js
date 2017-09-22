import Users from '/models/users'
import {microsoftCognitiveService} from '/services'
import {NotificationTrigger} from '/utils'
var io = require('socket.io')(4444)

// Ejecutar funcion de enviar notificacion
var notificatePush = new NotificationTrigger(io)
notificatePush.connect()

const debug = require('debug')('assistance-service:controllers:application-face')
class FaceIndetifyAppication {
  async identify (req, res) {
    try {
      if (!req.files.hasOwnProperty('photo')) {
        let payload = {success: false}
        return res['400'](payload, 'Bad Request!')
      }

      // Get photo
      let photo = req.files.photo
      debug('file data >>>', photo)

      // get photo url
      var fullUrl = `${req.protocol}://${req.get('host')}`
      let photoURL = `${fullUrl}/face/${photo.name}`

      // // Face API - Detect Service
      let fieldsDetect = {
        url: photoURL
      }
      let serviceDetect = await microsoftCognitiveService.faceDetect(fieldsDetect)
      debug('DETECT RESPONSE ->>', serviceDetect)

      if (!serviceDetect.success) {
        let payload = serviceDetect
        return res[`${payload.statusCode}`](payload.data, 'Face Detec failt!')
      }

      // Face API - Identify Service
      let fieldsIdentify = {
        personGroupId: 'workersteam',
        faceIds: [`${serviceDetect.data[0].faceId}`]
      }

      let serviceIdentify = await microsoftCognitiveService.faceIdentify(fieldsIdentify)
      debug('Identify RESPONSE ->>', serviceIdentify)

      if (!serviceIdentify.success) {
        let payload = serviceDetect
        return res[`${payload.statusCode}`](payload.data, 'Service Identify fail!')
      }

      if (!serviceIdentify.data[0].candidates.length) {
        let payload = serviceDetect
        return res[`${payload.statusCode}`](payload.data, 'Face Not Registered')
      }
      debug('Termino servicios ->>', serviceIdentify.data[0].candidates)
      debug('personId', serviceIdentify.data[0].candidates[0].personId)

      // TODO: Find user on db where candidates[0].personId
      let user = await Users.findOne({'personIDMicrosoftCognitive': serviceIdentify.data[0].candidates[0].personId})
      debug('USER', user)

      if (!user) {
        let payload = {success: false}
        return res['404'](payload, 'User Not Found!')
      }

      // update user statusConnectFace
      user.statusConnectFace = true
      await user.save()

      // Evento socket.io
      if (user.statusConnectQR === true && user.statusConnectFace === true) {
        notificatePush.notificar(user)
      }

      let payload = {
        success: true,
        user: user,
        candidates: serviceIdentify.data[0]
      }

      return res['200'](payload, 'Face Identify success!')
    } catch (err) {
      let payload = err
      return res['500'](payload, 'Face upload error!')
    }
  }
}

export default FaceIndetifyAppication
