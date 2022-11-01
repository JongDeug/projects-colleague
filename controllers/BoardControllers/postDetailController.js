const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const responseDataForm = require("../../config/responseDataForm");
// const _ = require("lodash");

const postMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPostId = req.params.postId;
    const getHitControl = req.body.hitControl;

    if (!getPostId || !getHitControl) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        // DB에서 읽어오는데 Post, Comment 둘다 읽어와야함.
        const foundPost = await Post.findById(getPostId).exec();
        const foundComments = await Comment.find({ postId: getPostId }).exec();

        if (getHitControl === "put") {
            foundPost.hit -= 1;
        } else {
            foundPost.hit += 1;
        }
        // 조회수 up

        const resultPost = await foundPost.save();
        const result = resultPost.toObject();
        result.comments = foundComments;

        // likeHit 유무 확인 코드
        if (result.likeHit.includes(getUserId)) {
            result.likeHitBool = true;
        } else {
            result.likeHitBool = false;
        }

        const responseData = responseDataForm(null, "readPostDetail get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod };