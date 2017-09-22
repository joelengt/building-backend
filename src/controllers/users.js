import Users from '/models/users'
import Photos from '/models/photos'
import jwt from 'jsonwebtoken'
import qr from 'qr-image'
import fs from 'fs'
import uuid from 'uuid'

import {microsoftCognitiveService} from '/services'
const debug = require('debug')('assistance-service:controllers:users')

function file (name) {
  return fs.createWriteStream('./uploads/qrs/' + name)
}

class User {
  async list (req, res) {
    try {
      debug('users')
      let users = await Users.find()

      if (!users.length) {
        let payload = {success: false, items: []}
        return res['404'](payload, 'users not registered on db')
      }

      let payload = {items: users}
      res.ok(payload, 'users found')
    } catch (err) {
      let payload = {success: false, error: err}
      res['500'](payload, 'Error server')
    }
  }

  async getById (req, res) {
    var userID = req.params.userID
    try {
      let user = await Users.findById(userID)
      if (!user) {
        let payload = {success: false}
        return res['404'](payload, 'user not found')
      }
      let payload = {items: user}
      res.ok(payload, 'user found')
    } catch (err) {
      let payload = {success: false, error: err}
      res['500'](payload, 'Error server')
    }
  }

  async create (req, res) {
    try {
      // Body data
      let user = {
        uuid: uuid.v1(),
        names: req.body.names,
        lastNames: req.body.lastNames,
        dni: req.body.dni,
        email: req.body.email,
        permiso: 'worker',
        tokenAuth: '',
        refrestToken: ''
      }

      user.fullName = `${user.names} ${user.lastNames}`

      let workerNew = new Users(user)
      debug('work!', workerNew)

      let userSaved = await workerNew.save()
      debug('user created!', userSaved)

      if (!userSaved) {
        return res['404']({success: false}, 'Error server')
      }

      userSaved.tokenAuth = jwt.sign(userSaved, process.env.JWT_SECRET)

      // Generate code QR
      var ecLevel = 'Q'
      qr.image(`${userSaved._id}`,
        {type: 'png', ec_level: ecLevel, parse_url: false, margin: 1})
        .pipe(file(`${userSaved._id}.png`))

      // Create a Person on Microsoft cognitive Service Microsoft cognitive - Person
      let personGroupID = 'workersteam'
      let body = {
        name: userSaved.fullName,
        userData: 'user created on microsoft Cognitive Service'
      }

      let person = await microsoftCognitiveService.personCreate(personGroupID, body)
      debug('Service person created?', person)

      if (!person.success) {
        return res['500']({success: false}, 'Microsoft Cognitive, Person not created')
      }

      // save personID on user
      userSaved.personIDMicrosoftCognitive = person.data.personId

      let userSaver2 = await userSaved.save()
      if (!userSaver2) {
        return res['404']({success: false}, 'Error server')
      }

      let payload = {success: true, user: userSaver2}
      res['201'](payload, 'user created')
    } catch (err) {
      let payload = {success: false, error: err}
      res['500'](payload, 'Error server')
    }
  }

  async addPhoto (req, res) {
    let userID = req.params.userID
    try {
      // Find user by userID
      let user = await Users.findById(userID)

      if (!user) {
        return res['404']({success: false}, 'User not found')
      }

      if (!req.files.hasOwnProperty('photo')) {
        return res['400']({success: false}, 'Bad Request')
      }

      let photoOrigin = req.files.photo
      let photoURL = `/face/${photoOrigin.name}`

      // create a new photo
      let attributesPhoto = {
        path: photoURL,
        user: userID,
        name: photoOrigin.name
      }

      let photo = new Photos(attributesPhoto)

      // add photo on database
      let photoSaved = await photo.save()
      if (!photoSaved) {
        return res['400']({success: false}, 'photo not saved')
      }

      // add photo on user
      user.photo.push(photo)
      let userSaved = await user.save()

      if (!userSaved) {
        return res['400']({success: false}, 'user updated')
      }

      // add face to Person Microsoft Cognitive
      let personGroupID = 'workersteam'
      let personID = userSaved.personIDMicrosoftCognitive

      var fullUrl = `${req.protocol}://${req.get('host')}`
      let photoPublicURL = `${fullUrl}${photo.path}`
      let data = {
        url: photoPublicURL
      }
      let personAddFace = await microsoftCognitiveService.personAddFace(personGroupID, personID, data)
      if (!personAddFace.success) {
        return res[`${personAddFace.statusCode}`](personAddFace.data, 'Photo not add to Person, Microsoft Cognitive')
      }
      debug('Add face to person', personAddFace)

      // updated faceID on photo
      photoSaved.faceIDMicrosoftCognitive = personAddFace.data.persistedFaceId
      let photoUpdated = await photoSaved.save()
      if (!photoUpdated) {
        return res['400']({success: false}, 'photo not updated')
      }

      res.ok({success: true, user: userSaved}, 'add photo to user success')
    } catch (err) {
      let payload = {success: false, error: err}
      res['500'](payload, 'Error server')
    }
  }

  delete (req, res) {
    var userID = req.params.userID
    res.status(200).json({
      status: 'user delete - ' + userID
    })
  }
}

export default User
