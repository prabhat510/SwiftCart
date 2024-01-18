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
  signature: String
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;