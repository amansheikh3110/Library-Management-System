const { error } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const connect = mongoose.connect("mongodb://localhost:27017/practice2");

connect
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
});

module.exports = mongoose;