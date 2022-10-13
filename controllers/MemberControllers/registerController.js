const Member = require('../../model/Member');
const bcrypt = require('bcryptjs');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'register.html'));
}

const postMethod = async (req, res) => {
    const getUserId = req.body.userId;
    const getPassword = req.body.password;
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if (!getUserId || !getPassword | !getUserName | !getDateOfBirth | !getEmail | !getInterestKeywords) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }

    // 중복 체킹
    const duplicate = await Member.findOne({ userId: getUserId }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    // 6~16자리 영문, 숫자, 특수문자 조합
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
    if (!regex.test(getPassword)) {
        return res.status(400).json({ 'message': "Password aren't strong enough" });
    }

    try {
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

        //redirect를 login 페이지로 
        const responseData = {
            message: `New user ${getUserId} created`,
            redirect: '/member/login'
        }
        res.status(200).json({ responseData });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { postMethod, getMethod };