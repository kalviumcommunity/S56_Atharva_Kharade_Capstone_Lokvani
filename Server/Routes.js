const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./Models/userSchema");
const Complaint = require("./Models/complaintSchema");
const upload = require("./Multer");
const cloudinary = require("./Cloudinary");

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
      return res.status(400).json({ error: "No image uploaded" });
    }
    cloudinary.uploader.upload(req.file.path, async function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error uploading image to cloudinary" });
      }
      try {
        const { title, description, area, complaintType, Location, createdBy } =
          req.body;
        const newComplaint = await Complaint.create({
          title,
          description,
          area,
          complaintType,
          Location,
          Image: result.secure_url,
          createdBy,
        });

        res.status(201).json({
          status: "success",
          message: "Complaint created successfully",
          newComplaint,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error creating complaint", details: error.message });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.get("/Complaint", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const startIndex = (page - 1) * limit;

    const complaints = await Complaint.find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    const totalDocuments = await Complaint.countDocuments();

    const totalPages = Math.ceil(totalDocuments / limit);

    const pagination = {
      totalPages: totalPages,
      currentPage: page,
      totalDocuments: totalDocuments,
    };

    console.log("Total Documents:", totalDocuments);
    console.log("Total Pages:", totalPages);

    res.json({ complaints, pagination });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Error fetching complaints" });
  }
});

router.get("/Complaint/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const complaints = await Complaint.find({ createdBy: username });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/Complaint/:username", async (req, res) => {
  const { username } = req.params;
  const { newUsername, newEmail } = req.body;

  try {
    const existingUsername = await User.findOne({ username: newUsername });
    if (existingUsername && existingUsername.username !== username) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail && existingEmail.username !== username) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { username: newUsername, email: newEmail },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id/upvote", async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  try {
    let complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.upvotedBy.includes(userEmail)) {
      await Complaint.findByIdAndUpdate(id, {
        $pull: { upvotedBy: userEmail },
        $inc: { voteCount: -1 },
      });
    } else {
      await Complaint.findByIdAndUpdate(id, {
        $addToSet: { upvotedBy: userEmail },
        $pull: { downvotedBy: userEmail },
        $inc: { voteCount: 1 },
      });
    }

    complaint = await Complaint.findById(id);
    res.json(complaint);
  } catch (error) {
    console.error("Error upvoting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id/downvote", async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  try {
    let complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.downvotedBy.includes(userEmail)) {
      await Complaint.findByIdAndUpdate(id, {
        $pull: { downvotedBy: userEmail },
        $inc: { voteCount: 1 },
      });
    } else {
      await Complaint.findByIdAndUpdate(id, {
        $addToSet: { downvotedBy: userEmail },
        $pull: { upvotedBy: userEmail },
        $inc: { voteCount: -1 },
      });
    }

    complaint = await Complaint.findById(id);
    res.json(complaint);
  } catch (error) {
    console.error("Error downvoting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/AdminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/AdminComplaints", async (req, res) => {
  try {
    const complaints = await Complaint.find({ verified: false });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
