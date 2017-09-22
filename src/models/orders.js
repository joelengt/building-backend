import mongoose from 'mongoose'
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
let Currency = mongoose.Types.Currency

let paymentOptions = ['CreditCard', 'DebitCard', 'Cash']

const orderSchema = new Schema({
  emisor: { type: Number, required: true },
  foods: [{
    type: Schema.Types.ObjectId,
    ref: 'food'
  }],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client'
  },
  paymentMethod: { type: String, emun: { values: paymentOptions, messages: 'Option Not valid' } },
  summary: {
    igv: { type: Currency, default: 0 },
    subtotal: { type: Currency, default: 0 },
    total: { type: Currency, default: 0 }
  },
  fechaCreada: { type: Date, default: Date.now }
})

const orders = mongoose.model('orders', orderSchema)

export default orders
