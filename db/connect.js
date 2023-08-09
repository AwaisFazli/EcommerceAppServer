const mongoose = require("mongoose");
// const url = "mongodb://127.0.0.1:27017/E-Com";

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
