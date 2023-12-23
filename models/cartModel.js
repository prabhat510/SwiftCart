const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  quantity: { type: Number, required: true },
  discount: { type: Number },
  remarks: { type: String},
});

const Cart = mongoose.model("Cart", cartItemSchema);
module.exports = Cart;