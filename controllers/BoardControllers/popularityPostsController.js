const responseDataForm = require("../../config/responseDataForm");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const Post = [PostAnything, PostBoast, PostInformation, PostQuestion];

const getMethod = async (req, res, next) => {

    try {
        // const resultAnything = await PostAnything.find({ $where : s});
        const resultBoast = await PostBoast.find({ likeHit : {'$size' : { '$gte': 1}}});
        const resultInformation = await PostInformation.find({ likeHit : {'$size' : { '$gte': 1}}});
        const resultQuestion = await PostQuestion.find({ likeHit : {'$size' : { '$gte': 1}}});

        const result = {
            "anything" : resultAnything,
            "boast": resultBoast,
            "information": resultInformation,
            "question": resultQuestion,
        }

        const responseData = responseDataForm(null, "popularity get request complete", result);
        res.status(200).json({responseData});
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }