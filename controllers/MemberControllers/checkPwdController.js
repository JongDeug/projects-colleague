const User = require('../../model/User');
const path = require('path');
const bcrypt = require('bcryptjs');

const getMethod = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'checkPwd.html'));
    if(false){
        next();
    }
}

const putMethod = async (req, res, next) => {
    // 비밀 번호 체킹 후 결과 값 주어짐 
    const userId = req.userId;
    const password = req.body.password;

    if(!password){
        return res.status(401).json({'message' : '입력해라,,'});
    }
    
    const foundUser = await User.DB.findOne({userId : userId}).exec();
    if(!foundUser){
        return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        const responseData = {
            redirect : '/member/changeInfo'
        }
        res.status(200).json({responseData});
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = {getMethod, putMethod};