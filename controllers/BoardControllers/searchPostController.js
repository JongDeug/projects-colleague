const responseDataForm = require("../../config/responseDataForm");
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

const postMethod = async (req, res, next) => {
    const getWhatToSearch = req.body.whatToSearch; // 검색 내용
    const getWhereToSearch = req.body.whereToSearch; // 제목, 내용, 제목 + 내용

    if (!getWhatToSearch || !getWhereToSearch) {
        return res.status(400).json({ "message": "입력 존재" });
    }

    try {
        let options = [];
        if (getWhereToSearch === "제목") {
            options = [{ postTitle: new RegExp(getWhatToSearch) }];
        } else if (getWhereToSearch === "내용") {
            options = [{ postContent: new RegExp(getWhatToSearch) }];
        } else if (getWhereToSearch === "제목+내용") {
            options = [
                { postContent: new RegExp(getWhatToSearch) },
                { postTitle: new RegExp(getWhatToSearch) }
            ];
        }
        const result = await Post.find({ $or: options }).exec();

        const responseData = responseDataForm("/board/all", "searchPost post request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod, setPost, setComment }