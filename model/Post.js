const mongoose = require("mongoose");
const schema = mongoose.Schema;
const getDateTime = require('../middleware/timezone');

const userSchema = new schema({
  userId: {
    type: String,
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
    type: String,
    // required: true,
    default: getDateTime()
  },
  hit: {
    type: Number,
    default: 0
  },
  likeHit: {
    type: [String],
    // required: false,
  },
  keywords: {
    type: String,
    required: true,
    ref: "Keyword",
  },
}, {
  versionKey: false
});

module.exports = mongoose.model("Post", userSchema);
