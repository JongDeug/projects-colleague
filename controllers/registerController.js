const User = require('../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    // front에서 user, pwd 값 받아오기
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and Password are required" });
    }

    // 중복 체킹
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    try {
        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pwd, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // username, 암호화된 pwd -> DB에 저장
        const result = await User.create({
            username: user,
            password: hashedPwd
        });
        console.log(result);

        res.status(201).json({ "success": `New user ${user} created` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = {handleNewUser};