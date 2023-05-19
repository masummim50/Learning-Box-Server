const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.msj15.mongodb.net/learningBox?retryWrites=true&w=majority`;
const localUri = "mongodb://127.0.0.1:27017/learningBox";



mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("error occured", error);
  });

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running successfully");
});
