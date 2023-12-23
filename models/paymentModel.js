const mongoose = require("mongoose");
const Order = require('./orderModel');

const paymentSchema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', unique: true }, 
  amount: { type: Number, required: true },
  paymentMethod: String,
  status: { type: String, default: 'pending' }, 
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = {Payment};