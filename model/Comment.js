const { getDate } = require("date-fns");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const getDateTime = require('../middleware/timezone');

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
    type: String,
    required: false,
    default: getDateTime(),
  },
}, {
  versionKey: false
});

module.exports = mongoose.model("Comment", userSchema);
