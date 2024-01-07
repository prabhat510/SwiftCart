const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productIdentifier: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  image: { type: String },
  rating: {type: Number, required: true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;