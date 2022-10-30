const Post = require("../../model/Post");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getPostId = req.params.postId;
    if (!getPostId) {
        return res.status(400).json({ "message": "There is missing data" });
    }
    
    try {

        // DB에서 읽어오는데 Post, Comment 둘다 읽어와야함.
        const result = await Post.findById(getPostId).exec();

        // 조회수 up
        result.hit += 1;
        await result.save();

        console.log(result);

        const responseData = responseDataForm(null, "readPostDetail get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod };