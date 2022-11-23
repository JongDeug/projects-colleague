const responseDataForm = require("../../config/responseDataForm");
const Member = require("../../model/Member");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const Post = {
    "anything" : PostAnything,
    "boast" : PostBoast,
    "information" : PostInformation,
    "question"  : PostQuestion
}

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    try{
        // 자신의 회원정보 불러오기.
        const foundMember = await Member.findOne({userId : getUserId}).exec();
        // 키워드 불러오기.
        const keywords = foundMember.interestKeywords;
        const result = {};

        for(const key in Post){
            // likeHit이 아님 수정. , 제일 많이 포함되는 걸로 뽑아보기.
            result[key] = await Post[key].find({likeHit : {$in : keywords}}).limit(3);
        }

        const responseData = responseDataForm("/", "recommentPosts get request complete", result);
        res.status(200).json({responseData});
    }catch(err){
        next(err);
    }
}

module.exports = {getMethod}