const responseDataForm = require("../../config/responseDataForm");

const postMethod = (Comment, PostType) => {
    return async (req, res, next) => {
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

                const responseData = responseDataForm(`/post/${PostType}/${postId}`, "comment post request complete", result);
                res.status(200).json({ responseData });
            } else {
                res.status(409).json({ "message": "중복된 댓글" });
            }
        } catch (err) {
            next(err);
        }
    };
}

const putMethod = (Comment, PostType) => {
    return async (req, res, next) => {
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

                const responseData = responseDataForm(`/post/${PostType}/${result.postId}`, "comment put request complete", result);
                res.status(200).json({ responseData });
            } else {
                res.status(400).json({ "message": "권한 없음" });
            }
        } catch (err) {
            next(err);
        }
    };
}

const deleteMethod = (Comment, PostType) => {
    return async (req, res, next) => {
        const userId = req.userId;
        const commentId = req.body.commentId;

        if (!commentId) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }
        try {

            const foundComment = await Comment.findById(commentId).exec();

            // 작성자, 권한 확인
            if (foundComment.userId === userId || req.allowed) {
                const result = await Comment.deleteOne({ _id: commentId });
                console.log(result);

                const responseData = responseDataForm(`/post/${PostType}/${foundComment.postId}`, "comment delete request complete", null);
                res.status(200).json({ responseData });
            } else {
                res.status(400).json({ "message": "권한 없음" });
            }

        } catch (err) {
            next(err);
        }
    };
}

module.exports = { postMethod, putMethod, deleteMethod };