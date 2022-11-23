const responseDataForm = require("../../config/responseDataForm");
const DB = require("../../config/dbTemplate");

const getMethod = async (req, res, next) => {

    try {
        const result = {};
        for(const key in DB.Post){
            // 좋아요 수가 ?개보다 같거나 큼, 내림차순으로 정렬, limit 2개
            result[key] = await DB.Post[key].aggregate().addFields({"likeHitLength":{"$size" : "$likeHit"}}).match({"likeHitLength" : {"$gte" : 1}}).sort({"likeHitLength": -1}).limit(2);
        }

        const responseData = responseDataForm(null, "popularity get request complete", result);
        res.status(200).json({responseData});
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }