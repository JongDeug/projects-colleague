const responseDataForm = require("../../config/responseDataForm");
const fs = require('fs');
const path = require('path');

let Post;
let Comment;

// 임시
Post = require('../../model/Post');
Comment = require('../../model/Comment');

const setPost = (post) => {
    Post = post;
}

const setComment = (comment) => {
    Comment = comment;
}


const getMethod = async (req, res, next) => {
    try {
        const result = await Post.find({});
        const responseData = responseDataForm(null, "board get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const postMethod = async (req, res, next) => {
    // 값 받기 
    console.log(req.files);
    const getUserId = req.userId;
    const getPostTitle = JSON.parse(req.body.postTitle);
    const getPostContent = JSON.parse(req.body.postContent);
    const getKeywords = JSON.parse(req.body.keywords);
    const getAttachedFile = req.files.map(file => file.path);

    if (!getPostTitle || !getPostContent || !getKeywords) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    // DB에 저장 
    try {
        const result = await Post.create({
            userId: getUserId,
            postTitle: getPostTitle,
            postContent: getPostContent,
            keywords: getKeywords,
            attachedFile: getAttachedFile
        });
        console.log(`result : ${result}`);

        const responseData = responseDataForm(`/post/${result._id}`, "board post request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const putMethod = async (req, res, next) => {
    // 값 받기
    const getUserId = req.userId;
    // multipart/form-data로 받기 위해서는 json springify -> paser해서 내가 받아줘야함.
    const getPostId = JSON.parse(req.body.postId);
    const getPostTitle = JSON.parse(req.body.postTitle);
    const getPostContent = JSON.parse(req.body.postContent);
    const getKeywords = JSON.parse(req.body.keywords);
    const getAttachedFile = req.files.map(file => file.path);

    if (!getPostId || !getPostTitle || !getPostContent || !getKeywords) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        // 게시물 찾고 
        const foundPost = await Post.findById(getPostId).exec();

        // 작성자, 권한 확인하기
        if (foundPost.userId === getUserId || req.allowed) {
            // 수정
            foundPost.postTitle = getPostTitle;
            foundPost.postContent = getPostContent;
            foundPost.keywords = getKeywords;
            foundPost.attachedFile = getAttachedFile;

            // 작성 일자에서 수정한 시간으로 바꿀까?
            const result = await foundPost.save();
            console.log(result);

            const responseData = responseDataForm(`/post/${result._id}`, "board put request complete", result);
            res.status(200).json({ responseData });
        } else {
            res.status(401).json({ message: "권한 없음" });
        }

    } catch (err) {
        next(err);
    }
}

const deleteMethod = async (req, res, next) => {
    // 값 받기
    const getUserId = req.userId;
    const getPostId = req.body.postId;

    if (!getPostId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundPost = await Post.findById(getPostId).exec();

        // 작성자, 권한 확인
        if (foundPost.userId === getUserId || req.allowed) {

            // upload 파일 지우기
            foundPost.attachedFile.map((name) => {
                console.log(name);
                fs.unlink(`${name}`,(err) => {
                    console.log(err);
                });
            })

            // 삭제
            const postResult = await Post.deleteOne({ _id: getPostId });
            console.log(postResult);
            const commentResults = await Comment.deleteMany({ postId: getPostId });
            console.log(commentResults);

            const responseData = responseDataForm(`/board/all`, "board delete request complete", null);
            res.status(200).json({ responseData });
        }
        else {
            res.status(401).json({ "message": "권한 없음" });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod, postMethod, putMethod, deleteMethod, setPost, setComment }