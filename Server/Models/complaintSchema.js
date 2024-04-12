const mongoose = require("mongoose");

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
  },
  { versionKey: false }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
