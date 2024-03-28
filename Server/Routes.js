const express = require("express");
const router = express.Router();
const {userModel} = require("./Models/userSchema");

router.use(express.json());

const bcrypt = require('bcryptjs');

router.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const bcrypt = require('bcryptjs');

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password." });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error("Error:", error);
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
