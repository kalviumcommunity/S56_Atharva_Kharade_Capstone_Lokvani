const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./Models/userSchema");
const Complaint = require("./Models/complaintSchema");

router.get("/", (req, res) => {
  res.send("SERVER WORKING!");
});

router.post("/Signup", async (req, res) => {
  try {
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json({
        error: "Username already exists! Please choose a different username.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.Access_Token, {
      expiresIn: "100d",
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.Access_Token, {
      expiresIn: "100d",
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/Complaint", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    cloudinary.uploader.upload(req.file.path, async function (error, result) {
      if (error) {
        return res.status(500).json({ error: 'Error uploading image to cloudinary' });
      }
      try {
        const { title, description, area, complaintType, Location } = req.body;
        const newComplaint = await Complaint.create({
          title,
          description,
          area,
          complaintType,
          Location,
          Image: result.secure_url,
        });

        res.status(201).json({
          status: "success",
          message: "Complaint created successfully",
          newComplaint,

        });
      } catch (error) {
        res.status(500).json({ error: 'Error creating complaint', details: error.message });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
