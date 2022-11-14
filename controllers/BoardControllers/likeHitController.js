const responseDataForm = require("../../config/responseDataForm");
let Post;
let Comment;

// 임시
Post = require('../../model/Post');
Comment = require('../../model/Comment');

const setPost = (post) => {
    Post = post;
}

const setComment = (comment) => {
    Comment = comment;
}

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPostId = req.params.postId;

    if (!getPostId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        // DB 검색
        const result = await Post.findById(getPostId).exec();

        // likeHit 배열에 userId 넣기
        // likeHit에 userId가 없으면 추가
        if (!result.likeHit.includes(getUserId)) {
            result.likeHit.push(getUserId);
            result.save();
        } else { // userId가 있으면 없에기.
            result.likeHit = result.likeHit.filter((user) => user !== getUserId);
            result.save();
        }

        const responseData = responseDataForm(null, "likeHit get request complete", result);
        res.status(200).json({ responseData });

    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod, setPost, setComment };