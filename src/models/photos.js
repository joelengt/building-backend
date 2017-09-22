import mongoose from 'mongoose'
const Schema = mongoose.Schema

const photoSchema = new Schema({
  path: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: { type: String },
  faceIDMicrosoftCognitive: { type: String },
  fechaCreada: { type: Date, default: Date.now }
})

const photos = mongoose.model('photos', photoSchema)

export default photos
