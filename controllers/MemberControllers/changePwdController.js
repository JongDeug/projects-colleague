const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const putMethod = async (req, res, next) => {
    // 유저 인증
    const getUserId = req.userId;
    const getPassword_exist = req.body.password_exist;
    const getPassword_change = req.body.password_change;

    if (!getPassword_exist || !getPassword_change) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        // 기존 비밀번호 확인 
        // 비번 바꾸기, DB에도 바꾸기
        const match = await bcrypt.compare(getPassword_exist, foundUser.password);
        if (match) {
            // 6~16자리 영문, 숫자, 특수문자 조합
            const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
            if (!regex.test(getPassword_change)) {
                return res.status(400).json({ "message": "Password aren't strong enough" });
            }

            const hashedPwd = await new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(getPassword_change, salt, (err, hash) => {
                        if (err) { reject(err); }
                        resolve(hash);
                    });
                });
            });

            if (!hashedPwd) {
                return res.sendStatus(401);
            }
            foundUser.password = hashedPwd;
            await foundUser.save();

            const responseData = responseDataForm("/", "changePwd put request complete", result);
            res.status(200).json({ responseData });
        }
        else {
            res.sendStatus(401);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { putMethod }