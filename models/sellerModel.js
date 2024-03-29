const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  onboardingDate: {
    type: Date,
    default: Date.now
  },
  saleCount: {
    type: Number,
    default: 0
  },
  returnPolicy: {
    type: String,
    required: true
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
