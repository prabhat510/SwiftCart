const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: Array, default: [] }, 
    totalAmount: { type: Number, required: true },
    shippingAddress: String,
    orderId: String,
    paymentStatus: { type: String, default: 'pending' }, // Order status (e.g., pending, success, failed)
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;


  // create order on make payment()
  // order-summart=>getOrder(orderId)
  /**
   * make payment -->> create orderId(getting it from razorpay)
   * make payment -->> create order(pass orderId recieved from razorpay)
   */