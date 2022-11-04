const Post = require("../../model/Post");

const postMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getWhatToSearch = req.body.whatToSearch; // 검색 내용
    const getWhereToSearch = req.body.whereToSearch; // 제목, 내용, 제목 + 내용

    if (!getWhatToSearch || !getWhereToSearch) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundPosts = await Post.find({});
        // let filterPosts;
        switch (getWhatToSearch) {
            case "제목":
                // foundPosts.filter((post) => )
                break;

            case "내용":
                break;

            case "제목+내용":
                break;
            default:
                foundPost = null;
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod }