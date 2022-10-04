const User = require('../../model/User');
const path = require('path');
const bcrypt = require('bcryptjs');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'changePwd.html'));
}

const putMethod = async (req, res) => {

    // 유저 인증
    const userId = req.userId;
    const password_exist = req.body.password_exist;
    const password_change = req.body.password_change;

    if (!password_exist || !password_change) {
        return res.status(400).json({ "message": "기존 비밀번호 및 변경 비밀번호를 입력하지 않으셨습니다." });
    }

    const foundUser = await User.DB.findOne({ userId: userId }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // 기존 비밀번호 확인 
    // 비번 바꾸기, DB에도 바꾸기
    const match = await bcrypt.compare(password_exist, foundUser.password);
    if (match) {
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password_change, salt, (err, hash) => {
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

        const responseData = {
            redirect: '/',
            result: true
        }
        res.status(200).json({ responseData });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { getMethod, putMethod }