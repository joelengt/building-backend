import {microsoftCognitive} from '/controllers'
import express from 'express'
const router = express.Router()

// Face api
router.route('/face/detect')
  .post(microsoftCognitive.faceDetect)

router.route('/face/verify')
  .post(microsoftCognitive.faceVerify)

router.route('/face/identify')
  .post(microsoftCognitive.faceIdentify)

// FaceList api
router.route('/facelists/:faceListID')
  .get(microsoftCognitive.faceListByID)
  .post(microsoftCognitive.faceListCreate)

router.route('/facelists/:faceListID/face')
  .post(microsoftCognitive.faceListAddFace)

// Person Group
router.route('/persongroups')
  .get(microsoftCognitive.personGroupList)

router.route('/persongroups/:personGroupID')
  .get(microsoftCognitive.personGroupByID)
  .post(microsoftCognitive.personGroupCreate)

router.route('/persongroups/:personGroupID/training')
  .get(microsoftCognitive.personGroupTrainingStatus)

router.route('/persongroups/:personGroupID/train')
  .post(microsoftCognitive.personGroupTrain)

// Person
router.route('/persongroups/:personGroupID/persons')
  .get(microsoftCognitive.personList)
  .post(microsoftCognitive.personCreate)

router.route('/persongroups/:personGroupID/persons/:personID')
  .get(microsoftCognitive.personByID)

router.route('/persongroups/:personGroupID/persons/:personID/face')
  .post(microsoftCognitive.personAddFace)

router.route('/persongroups/:personGroupID/persons/:personID/face/:faceID')
  .get(microsoftCognitive.personGetFace)

export default router
