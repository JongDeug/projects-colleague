const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const postMethod = async (req, res, next) => {
    const getUserId = req.body.userId;
    const getPassword = req.body.password;
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if (!getUserId || !getPassword || !getUserName || !getDateOfBirth || !getEmail || !getInterestKeywords) {
        return res.status(400).json({ "message": "There is missing data" });
    }

    try {
        // 중복 체킹, id랑 email 중복 체킹
        const duplicateId = await Member.findOne({ userId: getUserId }).exec();
        const duplicateEmail = await Member.findOne({ email: getEmail }).exec();

        if (duplicateId) {
            return res.status(409).json({"message" : "duplicate id"}) // conflict
        }

        if (duplicateEmail){
            return res.status(409).json({"message" : "duplicate email"}); // conflict
        }

        // 6~16자리 영문, 숫자, 특수문자 조합
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
        if (!regex.test(getPassword)) {
            return res.status(400).json({ "message": "Password aren't strong enough" });
        }

        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(getPassword, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // DB에 data저장
        const result = await Member.create({
            userId: getUserId,
            password: hashedPwd,
            userName: getUserName,
            dateOfBirth: getDateOfBirth,
            email: getEmail,
            interestKeywords: getInterestKeywords
        });
        console.log(result);

        const responseData = responseDataForm("/", `New user ${getUserId} created`, null)
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod };