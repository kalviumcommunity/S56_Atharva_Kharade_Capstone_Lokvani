const express = require("express");
const router = express.Router();
const {userModel} = require("./Models/userSchema");

router.use(express.json());

router.post("/users", async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    console.log("USER ERROR", err);
  }
});

module.exports = router;
