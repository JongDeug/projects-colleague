const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  // newsId: {
  //   type: Number,
  //   required: true,
  // },
  newsTitle: {
    type: String,
    required: true,
  },
  newsContent: {
    type: String,
    required: true,
  },
  newsDescription: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("News", userSchema);
