const responseDataForm = require("../../config/responseDataForm");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation= require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const resultAnything = await PostAnything.find({ userId: getUserId });
    const resultBoast = await PostBoast.find({ userId: getUserId });
    const resultInformation = await PostInformation.find({ userId: getUserId });
    const resultQuestion = await PostQuestion.find({ userId: getUserId });

    const result = {
        "anything": resultAnything,
        "boast": resultBoast,
        "information": resultInformation,
        "question": resultQuestion
    }

    const responseData = responseDataForm(
      null,
      "board get request complete",
      result
    );
    
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
