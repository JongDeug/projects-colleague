const responseDataForm = require("../../config/responseDataForm");
const CommentAnything = require("../../model/CommentAnything");
const CommentBoast = require("../../model/CommentBoast");
const CommentInformation= require("../../model/CommentInformation");
const CommentQuestion = require("../../model/CommentQuestion");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const resultAnything = await CommentAnything.find({ userId: getUserId });
    const resultBoast = await CommentBoast.find({ userId: getUserId });
    const resultInformation = await CommentInformation.find({ userId: getUserId });
    const resultQuestion = await CommentQuestion.find({ userId: getUserId });
    
    const result = {
        "anything" : resultAnything,
        "boast" : resultBoast,
        "information" : resultInformation,
        "question" : resultQuestion
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