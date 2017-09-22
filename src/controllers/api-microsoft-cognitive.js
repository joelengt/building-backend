import {microsoftCognitiveService} from '/services'
const debug = require('debug')('assistance-service:controllers:microsoft-cognitive')

class MicrosoftCognitive {
  // Face
  async faceDetect (req, res) {
    let body = req.body
    try {
      let service = await microsoftCognitiveService.faceDetect(body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async faceVerify (req, res) {
    let body = req.body
    try {
      let service = await microsoftCognitiveService.faceVerify(body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async faceIdentify (req, res) {
    let body = req.body
    try {
      let service = await microsoftCognitiveService.faceIdentify(body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  // FaceList
  async faceListByID (req, res) {
    let faceListID = req.params.faceListID
    try {
      let service = await microsoftCognitiveService.faceListByID(faceListID)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async faceListCreate (req, res) {
    let faceListID = req.params.faceListID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.faceListCreate(faceListID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async faceListAddFace (req, res) {
    let faceListID = req.params.faceListID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.faceListAddFace(faceListID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGroupList (req, res) {
    try {
      let service = await microsoftCognitiveService.personGroupList()
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGroupByID (req, res) {
    let personGroupID = req.params.personGroupID
    try {
      let service = await microsoftCognitiveService.personGroupByID(personGroupID)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGroupCreate (req, res) {
    let personGroupID = req.params.personGroupID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.personGroupCreate(personGroupID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGroupTrainingStatus (req, res) {
    let personGroupID = req.params.personGroupID
    try {
      let service = await microsoftCognitiveService.personGroupTrainingStatus(personGroupID)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGroupTrain (req, res) {
    let personGroupID = req.params.personGroupID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.personGroupTrain(personGroupID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personCreate (req, res) {
    let personGroupID = req.params.personGroupID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.personCreate(personGroupID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personAddFace (req, res) {
    let personGroupID = req.params.personGroupID
    let personID = req.params.personID
    let body = req.body
    try {
      let service = await microsoftCognitiveService.personAddFace(personGroupID, personID, body)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personByID (req, res) {
    let personGroupID = req.params.personGroupID
    let personID = req.params.personID
    try {
      let service = await microsoftCognitiveService.personByID(personGroupID, personID)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personList (req, res) {
    let personGroupID = req.params.personGroupID
    try {
      let service = await microsoftCognitiveService.personList(personGroupID)
      let payload = service
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }

  async personGetFace (req, res) {
    let personGroupID = req.params.personGroupID
    let personID = req.params.personID
    let faceID = req.params.faceID

    try {
      let service = await microsoftCognitiveService.personGetFace(personGroupID, personID, faceID)
      let payload = service
      debug('RESULT!!! >>>', payload)
      return res[`${payload.statusCode}`](payload.data, 'Face Detec success!')
    } catch (err) {
      debug('ERROR', err)
      let payload = err
      return res[`${payload.statusCode}`](payload.data, 'Face Detec error!')
    }
  }
}

export default MicrosoftCognitive
