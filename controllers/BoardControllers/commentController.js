const responseDataForm = require("../../config/responseDataForm");
let Post;
let Comment;

const setPost = (post) => {
    Post = post;
}

const setComment = (comment) => {
    Comment = comment;
}

const postMethod = async (req, res, next) => {
    const userId = req.userId;
    const contents = req.body.contents;
    const postId = req.body.postId;

    if (!contents || !postId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundComments = await Comment.find({ contents: contents });
        const duplicate = foundComments.map((comment) => comment.userId === userId && comment.postId === postId)
            .find((element) => element === true);

        if (!duplicate) {
            const result = await Comment.create({
                userId: userId,
                postId: postId,
                contents: contents,
            });
            console.log(`result : ${result}`);

            const responseData = responseDataForm(`/post/${postId}`, "comment post request complete", result);
            res.status(200).json({ responseData });
        } else {
            res.status(409).json({ "message": "중복된 댓글" });
        }
    } catch (err) {
        next(err);
    }
};

const putMethod = async (req, res, next) => {
    const userId = req.userId;
    const contents = req.body.contents;
    const commentId = req.body.commentId;

    if (!contents || !commentId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundComment = await Comment.findById(commentId).exec();

        // 작성자 확인
        if (foundComment.userId === userId) {
            foundComment.contents = contents;
            const result = await foundComment.save();
            console.log(`result : ${result}`);

            const responseData = responseDataForm(`/post/${result.postId}`, "comment put request complete", result);
            res.status(200).json({ responseData });
        } else {
            res.status(400).json({ "message": "권한 없음" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteMethod = async (req, res, next) => {
    const userId = req.userId;
    const commentId = req.body.commentId;

    if (!commentId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundComment = await Comment.findById(commentId).exec();

        if (foundComment.userId === userId) {
            const result = await Comment.deleteOne({ _id: commentId });
            console.log(result);

            const responseData = responseDataForm(`/post/${foundComment.postId}`, "comment delete request complete", null);
            res.status(200).json({ responseData });
        } else {
            res.status(400).json({ "message": "권한 없음" });
        }

    } catch (err) {
        next(err);
    }
};

module.exports = { postMethod, putMethod, deleteMethod, setComment, setPost };