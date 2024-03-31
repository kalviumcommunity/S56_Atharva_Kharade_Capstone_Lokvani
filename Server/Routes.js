const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("./Models/userSchema");

router.get("/", (req, res) => {
  res.send("SERVER WORKING!");
});

router.get("/Signup", async (req, res) => {
  let result = await User.find({});
  res.send(result);
});

router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
