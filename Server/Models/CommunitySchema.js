const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
})

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
    image: {
        type: String,
        required: true,
    },
    posts: [PostsSchema],
})

const Community = mongoose.model("community", CommunitySchema);

module.exports = Community;