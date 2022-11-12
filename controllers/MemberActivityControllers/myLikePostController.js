const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation= require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;

    try {
        // 쿼리로 간단하게 구현가능.
        const resultAnything = await PostAnything.find({ likeHit: getUserId });
        const resultBoast = await PostBoast.find({ likeHit: getUserId });
        const resultInformation = await PostInformation.find({ likeHit: getUserId });
        const resultQuestion = await PostQuestion.find({ likeHit: getUserId });

        const result = {
            "anything": resultAnything,
            "boast": resultBoast,
            "information": resultInformation,
            "question": resultQuestion
        }
        
        const responseData = responseDataForm(null, "myLikePost get request complete", result);

        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }