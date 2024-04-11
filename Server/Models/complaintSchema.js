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
    totalVotes: {
      type: Number,
      default: 0,
    },
    votedUsers: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false }
);

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
