const Post = require("../../model/Post");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;

    try {
        // 쿼리로 간단하게 구현가능.
        const result = await Post.find({ likeHit: getUserId });
        const responseData = responseDataForm(null, "myLikePost get request complete", result);

        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }