const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
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
    default: "Admin",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
