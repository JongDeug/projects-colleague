const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  postId: {
    type: Number,
    required: true,
    //ref: "Post",
  },
  commentId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    //ref: "Member",
  },
  contents: {
    type: String,
    required: false,
  },
  commentTime: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", userSchema);
