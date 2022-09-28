const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'register.html'));
}

const postMethod = async (req, res) => {
    const data = new User.DTO(); 
    data.setUserId = req.body.userId;
    data.setPassword = req.body.password;
    data.setDateOfBirth = req.body.dateOfBirth;
    data.setEmail = req.body.email;
    data.setInterestKeywords = req.body.interestKeywords;

    const requiredData = User.DTO.isEmpty(data);
    if(requiredData){
        return res.status(400).json({"Message": `${requiredData} 가 필요합니다.`});
    }

    // 중복 체킹
    const duplicate = await User.DB.findOne({ userId: data.getUserId }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    try {
        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.getPassword, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // DB에 data저장
        const result = await User.DB.create({
            userId: data.getUserId,
            password: hashedPwd,
            dateOfBirth: data.getDateOfBirth,
            email: data.getEmail,
            interestKeywords: data.getInterestKeywords
        });
        console.log(result);

        //redirect를 login 페이지로 
        const responseData = {
            message : `New user ${data.getUserId} created`,
            redirect : '/member/login'
        }
        res.status(201).json({responseData});
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { postMethod, getMethod };