const VideoNews = require("../../model/VideoNews");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  const videoNewsId = req.params.videoNewsId;
  try {
    const result = await VideoNews.findById(videoNewsId).exec();
    const responseData = responseDataForm(
      null,
      "Video News By ID get request complete",
      result
    );
    console.log(result);
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
