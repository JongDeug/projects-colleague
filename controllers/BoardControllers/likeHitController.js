const Post = require("../../model/Post");
const responseDataForm = require("../../config/responseDataForm");


const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPostId = req.params.postId;

    if (!getPostId) {
        return res.status(400).json({ "message": "There is missing data" });
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

        const responseData = responseDataForm("/", "likeHit get request complete", result);
        res.status(200).json({ responseData });

        // 프론트 단에서는 result를 확인하고 true인지 false인지 확인하고 싶다면 readPost에서 result.LikeHit을 계산하면됨.
        // 아니다 내가 계산해서 줘야되네
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod };