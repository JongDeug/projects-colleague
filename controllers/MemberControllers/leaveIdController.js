const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const deleteMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPassword = req.body.password;

    // body 비밀번호 유무 체킹
    if (!getPassword) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        // body 비밀번호 체킹
        const match = await bcrypt.compare(getPassword, foundUser.password);
        if (match) {
            //DB 삭제
            const result = await Member.deleteOne({ userId: getUserId });
            console.log(result);
            
            // jwt(refreshToken) client에서 지우기
            res.clearCookie("jwt", { httpOnly: true });

            const responseData = responseDataForm("/", "leaveId delete request complete");
            res.status(200).json({ responseData });
        }
        else {
            res.sendStatus(401);
        }
    } catch (err) {
        next(err);
    }

}


module.exports = { deleteMethod };