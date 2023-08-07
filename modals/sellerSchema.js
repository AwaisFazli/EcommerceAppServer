const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Seller",
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
