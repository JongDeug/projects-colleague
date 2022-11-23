const responseDataForm = require("../../config/responseDataForm");
const Notice = require("../../model/Notice");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const Post = {
    "anything": PostAnything,
    "boast": PostBoast,
    "information": PostInformation,
    "question": PostQuestion
}
const CommentAnything = require("../../model/CommentAnything");
const CommentBoast = require("../../model/CommentBoast");
const CommentInformation = require("../../model/CommentInformation");
const CommentQuestion = require("../../model/CommentQuestion");

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const resultPost = {};
    const getMyPostId = [];
    let resultNotice = [];
    let result = [];
    try {
        // 내가 작성한 post 찾기 
        for (const key in Post) {
            resultPost[key] = await Post[key].find({ userId: getUserId }).exec();
        }

        // postId만 뽑기
        for (const key in resultPost) {
            resultPost[key].map((post) => {
                getMyPostId.push(post._id.toString());
            });
        }

        // postId를 통해서 Notice에서 찾기
        // 관련된 Notice를 찾아야되지만 userId로 내가 아닌 사람을 걸러야함
        // async 중첩으로 쓰지 말기
        for (const postId of getMyPostId) {
            const foundNotice = await Notice.find({ postId: postId }).exec();

            // 배열 객체 펼쳐서 저장
            foundNotice.map((notice) => {
                // 나를 제외한 notice push
                if (notice.userId !== getUserId) {
                    resultNotice.push(notice);
                }
            })
        }

        // Notice를 다 찾았으니 Commend에서 몇 가지 정보를 들고와서 합쳐서 return 
        for(const notice of resultNotice){
            const postType = notice.postType;
            let foundComment;

            if(postType === "boardAnything"){
                foundComment = await CommentAnything.findById(notice.commentId).exec();
            }else if(postType == "boardInformation"){
                foundComment = await CommentInformation.findById(notice.commentId).exec();
            }else if(postType == "boardQuestion"){
                foundComment = await CommentQuestion.findById(notice.commentId).exec();
            }else if(postType === "boardBoast"){
                foundComment = await CommentBoast.findById(notice.commentId).exec();
            }

            const combineNoticeWithComment = notice.toObject(); // 변환!
            combineNoticeWithComment.commentType = foundComment.commentType;
            combineNoticeWithComment.commentTime = foundComment.commentTime;
            combineNoticeWithComment.contents = foundComment.contents;

            result.push(combineNoticeWithComment);
        }


        const responseData = responseDataForm(null, "notice get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}


module.exports = { getMethod }