const axios = require('axios')
const debug = require('debug')('assistance-service:repository:microsoft-cognitive')
const URI = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
const token = '956aa8b2859d4c2ab1c7cb92d8d7a967'

let service = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': token
  }
})

class MicrosoftCognitiveRepository {
  // Face
  async faceDetect (data) {
    try {
      let body = data
      let result = await service.post(`${URI}/detect`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async faceVerify (data) {
    try {
      let body = data

      let result = await service.post(`${URI}/verify`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async faceIdentify (data) {
    try {
      let body = data

      let result = await service.post(`${URI}/identify`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  // Face List
  async faceListByID (faceListID) {
    try {
      let result = await service.get(`${URI}/facelists/${faceListID}`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async faceListCreate (faceListID, data) {
    let body = data
    try {
      let result = await service.put(`${URI}/facelists/${faceListID}`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async faceListAddFace (faceListID, data) {
    let body = data
    try {
      let result = await service.post(`${URI}/facelists/${faceListID}/persistedFaces`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGroupList (faceListID, data) {
    try {
      let result = await service.get(`${URI}/persongroups`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGroupByID (personGroupID) {
    try {
      let result = await service.get(`${URI}/persongroups/${personGroupID}`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGroupCreate (personGroupID, data) {
    let body = data
    try {
      let result = await service.put(`${URI}/persongroups/${personGroupID}`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGroupTrainingStatus (personGroupID, data) {
    let body = data
    try {
      let result = await service.get(`${URI}/persongroups/${personGroupID}/training`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGroupTrain (personGroupID, data) {
    let body = data
    try {
      let result = await service.post(`${URI}/persongroups/${personGroupID}/train`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personCreate (personGroupID, data) {
    let body = data
    try {
      let result = await service.post(`${URI}/persongroups/${personGroupID}/persons`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personAddFace (personGroupID, personID, data) {
    let body = data
    try {
      let result = await service.post(`${URI}/persongroups/${personGroupID}/persons/${personID}/persistedFaces`, body)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personByID (personGroupID, personID) {
    try {
      let result = await service.get(`${URI}/persongroups/${personGroupID}/persons/${personID}`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personList (personGroupID) {
    try {
      let result = await service.get(`${URI}/persongroups/${personGroupID}/persons`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }

  async personGetFace (personGroupID, personID, faceID) {
    try {
      let result = await service.get(`${URI}/persongroups/${personGroupID}/persons/${personID}/persistedFaces/${faceID}`)
      let payload = {
        success: true,
        statusCode: result.status,
        data: result.data
      }
      return payload
    } catch (err) {
      let payload = {
        success: false,
        statusCode: err.response.status,
        data: err.response.data
      }
      return payload
    }
  }
}

export default MicrosoftCognitiveRepository
