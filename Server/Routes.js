const express = require("express");
const router = express.Router();
const userModel = require("./Models/userSchema");

router.use(express.json());

router.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUserByEmail = await userModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const existingUserByUsername = await userModel.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already exists. Please choose a different Username." });
    }

    const newUser = await userModel.create({ username, email, password });
    console.log("New user created:", newUser);
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
    console.log(users);
  } catch (err) {
    console.log("USER ERROR", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
