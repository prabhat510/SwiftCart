const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart', // Reference to the Cart model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  timestamp: {type: Date, default: Date.now()},
  statuscode: String,
  paymentId: String,
  orderId: String,
  signature: String
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;