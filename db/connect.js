const express = require("express");
const mongoose = require("mongoose");

const app = express();
// const url = "mongodb://127.0.0.1:27017/E-Com";
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const url = process.env.MongoURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
