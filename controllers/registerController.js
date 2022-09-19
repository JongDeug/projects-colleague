const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { fi } = require('date-fns/locale');

const handleNewUser = async (req, res) => {
    const data = {
        user: req.body.user,
        pwd: req.body.pwd,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        pet: req.body.pet,
        interestKeywords: req.body.interestKeywords
    };
    let filterdata = {};

    // filterdata(내용이 없는 데이터 걸러내기)
    for (const key in data) {
        const value = data[key];
        if (!value) { filterdata[key] = value; }
    }

    // Message 생성 후 종료
    const keys = Object.keys(filterdata);
    if (keys.length !== 0) {
        let str = keys.join(" ");
        return res.status(401).json({ "Message": `${str} are required` });
    }

    // 중복 체킹
    const duplicate = await User.findOne({ username: data.user }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    try {
        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.pwd, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // DB에 data저장
        const result = await User.create({
            username: data.user,
            password: hashedPwd,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            pet: data.pet,
            interestKeywords: data.interestKeywords
        });
        console.log(result);

        res.status(201).json({ "success": `New user ${data.user} created` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { handleNewUser };