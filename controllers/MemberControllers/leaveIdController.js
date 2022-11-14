const Member = require("../../model/Member");
const PostAnything = require("../../model/PostAnything");
const PostBoast = require("../../model/PostBoast");
const PostInformation = require("../../model/PostInformation");
const PostQuestion = require("../../model/PostQuestion");
const CommentAnything = require("../../model/CommentAnything");
const CommentBoast = require("../../model/CommentBoast");
const CommentInformation = require("../../model/CommentInformation");
const CommentQuestion = require("../../model/CommentQuestion");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const Post = [PostAnything, PostBoast, PostInformation, PostQuestion];
const Comment = [CommentAnything, CommentBoast, CommentInformation, CommentQuestion];

const deleteMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPassword = req.body.password;

    // body 비밀번호 유무 체킹
    if (!getPassword) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.status(401).json({ "message": "회원을 찾을 수 없음" });
        }

        // body 비밀번호 체킹
        const match = await bcrypt.compare(getPassword, foundUser.password);
        if (match) {
            Post.map((db, index) => {
                db.find({ userId: getUserId }, function (err, docs) {
                    if (err) {
                        return res.status(401).json({ "message": "내 포스트를 찾을 수 없음" });
                    }
                    docs.forEach(async (doc) => {
                        // 자신의 포스트에 댓글들 싹 삭제
                        const deleteComment = await Comment[index].deleteMany({ postId: doc._id });
                        console.log("deleteComment : %s", deleteComment);
                    });
                });
            })
            // 자신의 포스트들 찾기

            
            const resultMember = await Member.deleteOne({ userId: getUserId });
            console.log(resultMember);
            Post.map(async (db)=> {
                const result = await db.deleteMany({userId: getUserId});
                console.log(result);
            });
            Comment.map(async (db)=> {
                const result = await db.deleteMany({userId: getUserId});
                console.log(result);
            });

            // jwt(refreshToken) client에서 지우기
            res.clearCookie("jwt", { httpOnly: true });

            const responseData = responseDataForm("/", "leaveId delete request complete");
            res.status(200).json({ responseData });
        }
        else {
            res.sendStatus(401).json({ "message": "비밀번호 불일치" });
        }
    } catch (err) {
        next(err);
    }

}


module.exports = { deleteMethod };