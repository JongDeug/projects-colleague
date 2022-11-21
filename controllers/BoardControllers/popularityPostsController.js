const responseDataForm = require("../../config/responseDataForm");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const Post = {
    "anything" : PostAnything,
    "boast" : PostBoast,
    "information" : PostInformation,
    "question" : PostQuestion
}

const getMethod = async (req, res, next) => {

    try {
        const result = {};
        for(const key in Post){
            // 좋아요 수가 ?개보다 같거나 큼, 내림차순으로 정렬, limit 2개
            result[key] = await Post[key].aggregate().addFields({"likeHitLength":{"$size" : "$likeHit"}}).match({"likeHitLength" : {"$gte" : 1}}).sort({"likeHitLength": -1}).limit(2);
        }

        const responseData = responseDataForm(null, "popularity get request complete", result);
        res.status(200).json({responseData});
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }