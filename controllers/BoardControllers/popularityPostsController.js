const responseDataForm = require("../../config/responseDataForm");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");

const getMethod = async (req, res, next) => {

    try {
        // 좋아요 ? 개 이상 선택.
        const resultAnything = await PostAnything.find({$where : 'this.likeHit.length>0'}).sort({$sort:{size:1}})
        // const resultBoast = await PostBoast.find({$where : 'this.likeHit.length>0'});
        // const resultInformation = await PostInformation.find({$where : 'this.likeHit.length>0'});
        // const resultQuestion = await PostQuestion.find({$where : 'this.likeHit.length>0'});

        // const result = {
        //     "anything" : resultAnything,
        //     "boast": resultBoast,
        //     "information": resultInformation,
        //     "question": resultQuestion,
        // }

        const responseData = responseDataForm(null, "popularity get request complete", result);
        res.status(200).json({responseData});
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }