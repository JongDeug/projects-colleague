const Post = require('../../model/Post');
const path = require('path');

const getMethod = (req, res) => {

}

// verifyJWT 하고 들어옴
const postMethod = async (req, res) => {
    // 값 받기 
    const getUserId = "pinpoint19";
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
            message: 'good'
        }
        res.status(200).json({ responseData });
    } catch (err) {
        res.status(500).json({ 'message': err });
    }

}


module.exports = { getMethod, postMethod }