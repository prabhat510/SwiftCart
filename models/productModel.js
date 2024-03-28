const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true},
  productIdentifier: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  stockQuantity: { type: Number, required: true },
  rating: {type: Number, required: true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  weight: String,
  size: String,
  color: String,
  material: String,
  warranty: String,
  discount: {type: Number, default: 0},
  reviews: [String]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;