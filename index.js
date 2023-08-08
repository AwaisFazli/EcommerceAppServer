const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8000;

const path = require("path");
global.appRoot = path.resolve(__dirname);

const routes = require("./routes/index");
const connectDB = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

connectDB();

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}...`);
});
