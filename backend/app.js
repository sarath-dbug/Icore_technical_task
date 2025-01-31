const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();  
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

module.exports = app;