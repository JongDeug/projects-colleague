const Post = require('../../model/Post');

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
            message: 'request complete'
        }
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}


module.exports = { postMethod }