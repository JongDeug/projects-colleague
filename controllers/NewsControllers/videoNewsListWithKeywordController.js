const VideoNews = require("../../model/VideoNews");
const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const { User } = require("../../config/roles_list");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const getUser = await Member.findOne({ userId: getUserId });
    const getKeyword = getUser.interestKeywords;
    const result = await VideoNews.find({
      newsTitle: { $regex: getKeyword, $options: "i" },
    });
    const responseData = responseDataForm(
      null,
      "Video News With Key get request complete",
      result
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
