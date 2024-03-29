const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  statuscode: String,
  paymentId: String,
  orderId: String,
  signature: String,
  verificationStatus: {
    type: String,
    default: 'pending',
    required: true
  }, // success, failed, pending,
  remarks: {
    type: String,
    default: ''
  }
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;