const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./Models/userSchema");

router.get("/", (req, res) => {
  res.send("SERVER WORKING!");
});

router.post("/Signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword, 
            username: req.body.username
        });

        const token = jwt.sign({ _id: newUser._id }, process.env.Access_Token, {
            expiresIn: '100d',
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
