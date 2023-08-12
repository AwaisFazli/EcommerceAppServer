const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchaser",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  sellers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Shipped", "Delivered"],
    default: "Pending",
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
