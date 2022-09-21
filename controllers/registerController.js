const User = require('../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const data = new User.DTO(); 
    data.setUsername = req.body.username;
    data.setPassword = req.body.password;
    data.setDateOfBirth = req.body.dateOfBirth;
    data.setEmail = req.body.email;
    data.setPet = req.body.pet;
    data.setInterestKeywords = req.body.interestKeywords;
    // const data = {
    //     username: req.body.username,
    //     password: req.body.password,
    //     dateOfBirth: req.body.dateOfBirth,
    //     email: req.body.email,
    //     pet: req.body.pet,
    //     interestKeywords: req.body.interestKeywords
    // };
    let filterdata = {};

    // filterdata(내용이 없는 데이터 걸러내기)
    for (const key in data) {
        const value = data[key];
        if (!value) { 
    
        }
    }

    // 1.DTO에 뭔가 넣어서 확인하거나 
    // 2.여기서 함수로 정리해서 확인하면 될듯. 이거 짜놓으면 ㄱㅊ을듯

    // Message 생성 후 종료
    const keys = Object.keys(filterdata);
    if (keys.length !== 0) {
        let str = keys.join(" ");
        if (keys.length === 1) {
            return res.status(401).json({ "Message": `${str} is required` });
        } else {
            return res.status(401).json({ "Message": `${str} are required` });
        }
    }

    // 중복 체킹
    const duplicate = await User.findOne({ username: data.username }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    try {
        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // DB에 data저장
        const result = await User.create({
            username: data.username,
            password: hashedPwd,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            pet: data.pet,
            interestKeywords: data.interestKeywords
        });
        console.log(result);

        res.status(201).json({ "success": `New user ${data.username} created` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { handleNewUser };