const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: false,
  },
  postTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  hit: {
    type: Number,
    required: true,
  },
  likeHit: {
    type: Number,
    required: true,
  },
  keywords: {
    type: Types.ObjectId,
    required: true,
    ref: "Keyword",
  },
});

module.exports = mongoose.model("Post", userSchema);
