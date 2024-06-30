const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
    },
    Image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    upvotedBy: [
      {
        type: String,
      },
    ],
    downvotedBy: [
      {
        type: String,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { versionKey: false }
);

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
