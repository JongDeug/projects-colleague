const responseDataForm = require("../../config/responseDataForm");
const Notice = require("../../model/Notice");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation= require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const Post = {
    "anything": PostAnything,
    "boast": PostBoast,
    "information" : PostInformation,
    "question" : PostQuestion
}

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const resultPost = {};
    const getMyPostId = [];
    try {
        // 내가 작성한 post 찾기 
        for(const key in Post){
            resultPost[key] = await Post[key].find({userId : getUserId}).exec();
        }

        // postId만 뽑기
        for(const key in resultPost){
            resultPost[key].map((post) => {
                getMyPostId.push(post._id);
            });
        }

        let result = [];
        // postId를 통해서 Notice에서 찾기
        // 관련된 Notice를 찾아야되지만 userId로 내가 아닌 사람을 걸러야함
        getMyPostId.map(async (postId) => {
           result = await Notice.find({postId : postId}).exec();
        })
        
        const responseData = responseDataForm(null, "notice get request complete", result);
        res.status(200).json({responseData});
    } catch (err) {
        next(err);
    }
}


module.exports = { getMethod }