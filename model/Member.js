const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  interestKeywords: {
    type: String,
    required: true,
  },
  refreshToken: String,
}, {
  versionKey: false
});

module.exports = mongoose.model("Member", userSchema);
