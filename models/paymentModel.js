const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now()},
  statuscode: String,
  paymentId: String,
  orderId: String,
  signature: String
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;