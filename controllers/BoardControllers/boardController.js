const Post = require('../../model/Post');


const getMethod = async (req, res, next) => {

}

const postMethod = async (req, res, next) => {
    // 값 받기 
    const getUserId = req.userId;
    const getPostTitle = req.body.postTitle;
    const getPostContent = req.body.postContent;
    const getKeywords = req.body.keywords;

    if (!getPostTitle || !getPostContent || !getKeywords) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }
    // comment는 따로 commentcontroller에서 만들고 postid 받아와서 따로 관리함. 
    // DB에 저장 
    try {
        const result = await Post.create({
            userId: getUserId,
            postTitle: getPostTitle,
            postContent: getPostContent,
            keywords: getKeywords
        });
        console.log(`result : ${result}`);

        const responseData = {
            redirect: '/',
            message: 'request complete',
            result: result,
        }
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const putMethod = async (req, res, next) => {
    // 값 받기
    const getUserId = req.userId;
    const getPostId = req.body.postId;
    const getPostTitle = req.body.postTitle;
    const getPostContent = req.body.postContent;
    const getKeywords = req.body.keywords;

    if (!getPostId || !getPostTitle || !getPostContent || !getKeywords) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }

    try {
        // 게시물 찾고 
        const foundPost = await Post.findOne({ _id: getPostId }).exec();

        // admin user 권한 추가하기 전 대충 만든 code
        if (foundPost.userId === getUserId) {

            // 수정
            foundPost.postTitle = getPostTitle;
            foundPost.postContent = getPostContent;
            foundPost.keywords = getKeywords;

            // 작성 일자에서 수정한 시간으로 바꿀까?
            await foundPost.save();

            const responseData = {
                redirect: '/',
                message: 'board put request complete'
            }
            res.status(200).json({ responseData });
        } else {
            res.status(401).json({ message: '권한 없음' });
        }

    } catch (err) {
        next(err);
    }
}

const deleteMethod = (req, res, next) => {

}

module.exports = { getMethod, postMethod, putMethod, deleteMethod }