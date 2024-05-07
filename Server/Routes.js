const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./Models/userSchema");
const Complaint = require("./Models/complaintSchema");
const Community = require("./Models/CommunitySchema");
const upload = require("./Multer");
const cloudinary = require("./Cloudinary");
const rateLimit = require("express-rate-limit");
const { ObjectId } = require("mongoose").Types;
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("SERVER WORKING!");
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid complaint ID format" });
  }
  next();
};

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

router.get("/GoogleSignup", async (req, res) => {
  try {
    const { email } = req.query;

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ error: "Email already exists!" });
    } else {
      return res.status(200).json({ message: "Email does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/UsernameCheck", async (req, res) => {
  try {
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
    res.status(201).json({ newUser });
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
  const limit = parseInt(req.query.limit) || 7;
  const sortBy = req.query.sortBy || "";
  try {
    let complaints;
    let totalDocuments;

    if (sortBy === "most-voted") {
      complaints = await Complaint.find()
        .sort({ voteCount: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      totalDocuments = await Complaint.countDocuments();
    } else if (sortBy === "most-downvoted") {
      complaints = await Complaint.find()
        .sort({ voteCount: 1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      totalDocuments = await Complaint.countDocuments();
    } else {
      complaints = await Complaint.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      totalDocuments = await Complaint.countDocuments();
    }

    const totalPages = Math.ceil(totalDocuments / limit);

    const pagination = {
      totalPages: totalPages,
      currentPage: page,
      totalDocuments: totalDocuments,
    };
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

router.put("/:id/upvote", validateObjectId, async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let complaint = await Complaint.findById(id).session(session);

    if (!complaint) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.upvotedBy.includes(userEmail)) {
      await Complaint.findByIdAndUpdate(id, {
        $pull: { upvotedBy: userEmail },
        $inc: { voteCount: -1 },
      }).session(session);
    } else {
      await Complaint.findByIdAndUpdate(id, {
        $addToSet: { upvotedBy: userEmail },
        $pull: { downvotedBy: userEmail },
        $inc: { voteCount: 1 },
      }).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    complaint = await Complaint.findById(id);
    res.json(complaint);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error upvoting complaint:", error);
    res.status(500).json({
      message: "Failed to upvote complaint due to an internal server error",
      error: error.message,
    });
  }
});

router.put("/:id/downvote", validateObjectId, async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let complaint = await Complaint.findById(id).session(session);

    if (!complaint) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.downvotedBy.includes(userEmail)) {
      await Complaint.findByIdAndUpdate(id, {
        $pull: { downvotedBy: userEmail },
        $inc: { voteCount: 1 },
      }).session(session);
    } else {
      await Complaint.findByIdAndUpdate(id, {
        $addToSet: { downvotedBy: userEmail },
        $pull: { upvotedBy: userEmail },
        $inc: { voteCount: -1 },
      }).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    complaint = await Complaint.findById(id);
    res.json(complaint);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error downvoting complaint:", error);
    res.status(500).json({
      message: "Failed to downvote complaint due to an internal server error",
      error: error.message,
    });
  }
});

router.post("/AdminLogin", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
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

router.put("/VerifyComplaint/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findByIdAndUpdate(id, { verified: true });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint verified successfully" });
  } catch (error) {
    console.error("Error verifying complaint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/DeleteComplaint/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/ComplaintComment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/comment/:id", async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { email, comment } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        $push: {
          comments: { email, comment },
        },
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/community", async (req, res) => {
  const { email } = req.query;
  try {
    const community = await Community.find({
      members: { $in: email },
    });
    res.json(community);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/community/:name", async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const community = await Community.findOne({ name });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    res.json(community);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/community/:name/posts", async (req, res) => {
  const communityName = decodeURIComponent(req.params.name);

  try {
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const { description, createdBy } = req.body;

    const newPost = {
      description,
      createdBy,
      comments: [],
    };

    community.posts.push(newPost);
    await community.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/community/:name/posts/:postId/upvote", async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { postId } = req.params;
  const { userEmail } = req.body;

  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const post = community.posts.find((post) => post._id.equals(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.upvotedBy.includes(userEmail)) {
      post.upvotedBy.pull(userEmail);
      post.voteCount -= 1;
    } else {
      post.upvotedBy.push(userEmail);
      if (post.downvotedBy.includes(userEmail)) {
        post.downvotedBy.pull(userEmail);
        post.voteCount += 2;
      } else {
        post.voteCount += 1;
      }
    }

    await community.save();
    res.json(post);
  } catch (error) {
    console.error("Error upvoting post:", error);
    res.status(500).json({
      message: "Failed to upvote post due to an internal server error",
      error: error.message,
    });
  }
});

router.put("/community/:name/posts/:postId/downvote", async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { postId } = req.params;
  const { userEmail } = req.body;

  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const post = community.posts.find((post) => post._id.equals(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.downvotedBy.includes(userEmail)) {
      post.downvotedBy.pull(userEmail);
      post.voteCount += 1;
    } else {
      post.downvotedBy.push(userEmail);
      if (post.upvotedBy.includes(userEmail)) {
        post.upvotedBy.pull(userEmail);
        post.voteCount -= 2;
      } else {
        post.voteCount -= 1;
      }
    }

    await community.save();
    res.json(post);
  } catch (error) {
    console.error("Error downvoting post:", error);
    res.status(500).json({
      message: "Failed to downvote post due to an internal server error",
      error: error.message,
    });
  }
});

router.get("/community/:name/posts/:postId", async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { postId } = req.params;

  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const post = community.posts.find((post) => post._id.equals(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/community/:name/posts/:postId/comment", async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { postId } = req.params;
  const { comment, email } = req.body;

  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const post = community.posts.find((post) => post._id.equals(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ comment, email });
    await community.save();

    res.json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getCommunity", async (req, res) => {
  const { email } = req.query;
  try {
    const community = await Community.find({
      members: { $nin: email },
    });
    res.json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/addMember", async (req, res) => {
  const { communityId, email } = req.body;

  try {
    if (!ObjectId.isValid(communityId)) {
      return res.status(400).json({ error: "Invalid community ID" });
    }

    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (community.members.includes(email)) {
      return res
        .status(400)
        .json({ error: "Email already exists in members array" });
    }

    community.members.push(email);

    await community.save();

    return res
      .status(200)
      .json({ message: "Member added successfully", community });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/removeMember", async (req, res) => {
  const { communityId, email } = req.body;

  try {
    if (!ObjectId.isValid(communityId)) {
      return res.status(400).json({ error: "Invalid community ID" });
    }
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    if (!community.members.includes(email)) {
      return res
        .status(400)
        .json({ error: "Email does not exist in members array" });
    }
    community.members.pull(email);
    await community.save();
    return res
      .status(200)
      .json({ message: "Member removed successfully", community });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("*", (req, res) => res.status(404).send("Page not found"));
module.exports = { router };
