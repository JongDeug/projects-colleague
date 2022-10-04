const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
    //ref: "Member",
  },
  postId: {
    type: Number,
    required: true,
    //ref: "Post",
  },
  commentId: {
    type: Number,
    required: true,
    //ref: "Comment",
  },
});

module.exports = mongoose.model("Notice", userSchema);
