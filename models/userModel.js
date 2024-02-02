const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    mobile: {type: String, required: true},
    address: {type: String, default: ""},
    password: {
      type: String,
      required: true,
    },
  });
  
const User = mongoose.model("User", userSchema);
module.exports = User;