const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

const path = require("path");
global.appRoot = path.resolve(__dirname);

const routes = require("./routes/index");
const connectDb = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(routes);

connectDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}...`);
});
