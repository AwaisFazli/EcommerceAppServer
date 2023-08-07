const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaserSchema = new Schema({
  username: {
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
    default: "Purchaser",
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Purchaser = mongoose.model("Purchaser", purchaserSchema);

module.exports = Purchaser;
