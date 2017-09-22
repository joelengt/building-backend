import MicrosoftCognitive from './api-microsoft-cognitive'
import FaceIndetifyAppication from './face-indetify-appication'
import User from './users'
import AssistanceOverview from './assistance-application'

const microsoftCognitive = new MicrosoftCognitive()
const faceIndetifyAppication = new FaceIndetifyAppication()
const user = new User()
const assistanceOverview = new AssistanceOverview()

export default {
  microsoftCognitive,
  faceIndetifyAppication,
  user,
  assistanceOverview
}
