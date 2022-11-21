const responseDataForm = require("../../config/responseDataForm");
const Member = require("../../model/Member");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    try{
        // 자신의 회원정보 불러오기.
        const foundMember = await Member.findOne({userId : getUserId}).exec();
        // 키워드 불러오기.
        const keywords = foundMember.interestKeywords;

        // 키워드에 맞게 조회
        const resultAnything = await PostAnything.find({likeHit : {$in : keywords}}).limit(3); // array를 바로 넣어도 쿼리문 작동, JSON.stringify로는 작동 x
        const resultBoast = await PostBoast.find({likeHit : {$in : ['man851', 'pinpoint1998']}});
        const resultInformation = await PostInformation.find({likeHit : {$in : ['man851', 'pinpoint1998']}});
        const resultQuestion = await PostQuestion.find({likeHit : {$in : ['man851', 'pinpoint1998']}});

        const result = {
            "anything" : resultAnything,
            "boast" : resultBoast,
            "information" : resultInformation,
            "question" : resultQuestion
        }
        const responseData = responseDataForm("/", "recommentPosts get request complete", resultAnything);
        res.status(200).json({responseData});
        // const resultboast = await 
        // const resultinformation = await postinformation
        // const resultquestion = await postquestion.aggregate().addfields({"likehitlength":{"$size" : "$likehit"}}).match({"likehitlength" : {"$gte" : 1}}).sort({"likehitlength": -1}).limit(2);
    }catch(err){
        next(err);
    }
}

module.exports = {getMethod}