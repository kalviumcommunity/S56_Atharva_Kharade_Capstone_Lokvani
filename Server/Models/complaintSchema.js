const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
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
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    upvotedBy: [
      {
        type: Number,
      },
    ],
    downvotedBy: [
      {
        type: Number,
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
