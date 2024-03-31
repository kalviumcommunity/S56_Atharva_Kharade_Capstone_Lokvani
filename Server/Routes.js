const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("SERVER WORKING!");
});

router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
