const News = require("../../model/News");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  const newsId = req.params.newsId;
  try {
    const result = await News.findById(newsId).exec();
    const responseData = responseDataForm(
      null,
      "News get request complete",
      result
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
