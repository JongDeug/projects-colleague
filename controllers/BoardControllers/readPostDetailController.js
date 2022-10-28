const Post = require("../../model/Post");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    try {
        const getPostId = req.params.postId;

        const result = await Post.findById(getPostId).exec();
        console.log(result);

        const responseData = responseDataForm(null, "readPostDetail get request complete");
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod };