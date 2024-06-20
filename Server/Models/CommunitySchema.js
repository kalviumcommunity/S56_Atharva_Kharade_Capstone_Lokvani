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

const PostsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  userImage: {
    type: String,
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
  comments: [commentSchema],
});

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: [
    {
      type: String,
    },
  ],
  posts: [PostsSchema],
});

const Community = mongoose.model("communitys", CommunitySchema);

module.exports = Community;
