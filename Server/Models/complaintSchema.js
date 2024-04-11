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
    votes: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      voteType: { type: String, enum: ['upvote', 'downvote'] }
    }],
    votesCount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
