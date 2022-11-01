const Member = require("../../model/Member");
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

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
            //DB 삭제
            const resultMember = await Member.deleteOne({ userId: getUserId });
            console.log(resultMember);
            const resultPost = await Post.deleteMany({ userId: getUserId });
            console.log(resultPost);
            const resultComment = await Comment.deleteMany({ userId: getUserId });
            console.log(resultComment);

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