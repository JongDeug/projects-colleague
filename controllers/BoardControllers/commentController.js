const Comment = require("../../model/Comment");
const responseDataForm = require("../../config/responseDataForm");

// const getMethod = async (req, res, next) => {
//   const postId = req.post_id;
//   try {
//     const postList = await Post.findOne({ postId: postId });
//     const commentList = await Comment.find({ postId: postId });
//     // console.log(`result : ${commentList}`);

//     const responseData = {
//       postTitle: postList.postTitle,
//       postContent: postList.postContent,
//       result: commentList,
//     };

//     res.status(200).json({ responseData });
//   } catch (err) {
//     next(err);
//   }
// };

const postMethod = async (req, res, next) => {
    // const userId = req.body.userId;  
    const userId = req.userId;
    const contents = req.body.contents;
    const postId = req.body.postId;

    if (!contents || !postId) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {
        const result = await Comment.create({
            userId: userId,
            //   postId: req.post_id,
            postId: postId,
            contents: contents,
        });
        console.log(`result : ${result}`);

        // const responseData = {
        //   redirect: "/",
        //   message: "request complete",
        //   redirect: "/board/readPostDetail",
        // };

        // result 보내줘야함.
        const responseData = responseDataForm("/", "comment post request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
};

const putMethod = async (req, res, next) => {
    const userId = req.userId;
    const contents = req.body.contents;
    // const commentId = req.comment_id;
    const commentId = req.body.commentId;

    if (!contents || !commentId) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {
        // const result = await Comment.updateOne(
        //     { _id: commentId },
        //     {
        //         contents: contents,
        //     }
        // );
        const foundComment = await Comment.findById(commentId).exec();

        // 작성자 확인
        if (foundComment.userId === userId) {
            foundComment.contents = contents;
            const result = await foundComment.save();
            console.log(`result : ${result}`);

            const responseData = responseDataForm("/", "comment put request complete", result);
            res.status(200).json({ responseData });
        } else {
            res.status(200).json({ "message": "권한 없음" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteMethod = async (req, res, next) => {
    const userId = req.userId;
    const commentId = req.body.commentId;

    if (!commentId) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {

        const foundComment = await Comment.findById(commentId).exec();

        if (foundComment.userId === userId) {
            // _id여야함
            const result = await Comment.deleteOne({ _id : commentId });
            console.log(result);

            const responseData = responseDataForm("/", "comment delete request complete", null);
            res.status(200).json({ responseData });
        } else {
            res.status(200).json({ "message": "권한 없음" });
        }

    } catch (err) {
        next(err);
    }
};

module.exports = { postMethod, putMethod, deleteMethod };