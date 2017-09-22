import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  uuid: { type: String, required: true },
  names: { type: String, required: true },
  lastNames: { type: String, required: true },
  fullName: { type: String },
  photo: [{
    type: Schema.Types.ObjectId,
    ref: 'photos'
  }],
  personIDMicrosoftCognitive: { type: String },
  dni: { type: String },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  permiso: { type: String },
  tokenAuth: { type: String },
  refrestToken: { type: String },
  fechaCreada: { type: Date, default: Date.now },
  horaEntrada: { type: Date, default: Date.now },
  statusConnectQR: { type: Boolean, default: false },
  statusConnectFace: { type: Boolean, default: false }
})

const users = mongoose.model('users', userSchema)

export default users
