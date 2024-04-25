const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
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
  },
  { versionKey: false }
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
    voteCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { versionKey: false }
);

const Complaint = mongoose.model("complaint", complaintSchema);
const Comment = mongoose.model("comment", commentSchema);

module.exports = Complaint;
