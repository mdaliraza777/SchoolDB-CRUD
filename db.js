const mongoose = require("mongoose");
require('dotenv').config();

const mongodbURL = process.env.mongodbUrl;

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database has connected to nodejs server");
});

db.on("error", (err) => {
  console.log("Mongodb connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

module.exports = db;
