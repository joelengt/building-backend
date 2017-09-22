import {microsoftCognitiveRepository} from '/repository'
const debug = require('debug')('assistance-service:services:microsoft-cognitive')

class MicrosoftCognitiveService {
  // Face
  async faceDetect (data) {
    let fields = {
      url: data.url
    }
    try {
      let response = await microsoftCognitiveRepository.faceDetect(fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async faceVerify (data) {
    let fields = {
      faceId1: data.faceId1,
      faceId2: data.faceId2
    }
    try {
      let response = await microsoftCognitiveRepository.faceVerify(fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async faceIdentify (data) {
    let fields = {
      personGroupId: data.personGroupId,
      faceIds: data.faceIds
    }
    try {
      let response = await microsoftCognitiveRepository.faceIdentify(fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  // FaceList
  async faceListByID (faceListID) {
    try {
      let response = await microsoftCognitiveRepository.faceListByID(faceListID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async faceListCreate (faceListID, data) {
    let fields = {
      name: data.name,
      userData: data.userData
    }
    try {
      let response = await microsoftCognitiveRepository.faceListCreate(faceListID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async faceListAddFace (faceListID, data) {
    let fields = {
      url: data.url
    }
    try {
      let response = await microsoftCognitiveRepository.faceListAddFace(faceListID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  // Person Group
  async personGroupList () {
    try {
      let response = await microsoftCognitiveRepository.personGroupList()
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personGroupByID (personGroupID) {
    try {
      let response = await microsoftCognitiveRepository.personGroupByID(personGroupID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personGroupCreate (personGroupID, data) {
    let fields = {
      name: data.name,
      userData: data.userData
    }
    try {
      let response = await microsoftCognitiveRepository.personGroupCreate(personGroupID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personGroupTrainingStatus (personGroupID) {
    try {
      let response = await microsoftCognitiveRepository.personGroupTrainingStatus(personGroupID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personGroupTrain (personGroupID, data) {
    let fields = {
      name: data.name,
      userData: data.userData
    }
    try {
      let response = await microsoftCognitiveRepository.personGroupTrain(personGroupID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  // Person
  async personCreate (personGroupID, data) {
    let fields = {
      name: data.name,
      userData: data.userData
    }
    try {
      let response = await microsoftCognitiveRepository.personCreate(personGroupID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personAddFace (personGroupID, personID, data) {
    let fields = {
      url: data.url
    }
    try {
      let response = await microsoftCognitiveRepository.personAddFace(personGroupID, personID, fields)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personByID (personGroupID, personID) {
    try {
      let response = await microsoftCognitiveRepository.personByID(personGroupID, personID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personList (personGroupID) {
    try {
      let response = await microsoftCognitiveRepository.personList(personGroupID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }

  async personGetFace (personGroupID, personID, faceID) {
    try {
      let response = await microsoftCognitiveRepository.personGetFace(personGroupID, personID, faceID)
      let payload = response
      return payload
    } catch (err) {
      let payload = err
      return payload
    }
  }
}

export default MicrosoftCognitiveService
