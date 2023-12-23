const mongoose = require("mongoose");

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }], 
    totalAmount: { type: Number, required: true },
    shippingAddress: String,
    status: { type: String, default: 'pending' }, // Order status (e.g., pending, shipped, delivered)
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model('Order', orderSchema);
  module.exports = {Order};