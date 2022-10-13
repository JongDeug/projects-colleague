const News = require("../../model/News");
const path = require("path");
const { db } = require("../../model/News");

const getMethod = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "/views", "newsList.html"));
};
const postMethod = async (req, res) => {};

module.exports = { postMethod, getMethod };
