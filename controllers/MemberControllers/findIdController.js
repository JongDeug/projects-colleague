const Member = require('../../model/Member');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'findId.html'));
}

const postMethod = async (req, res) => {
    const getUserId = req.userId;
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;

    if(!getUserName | !getDateOfBirth | !getEmail){
        return res.status(400).json({'message' : 'There is missing data'});
    }

    const foundUser = await Member.findOne({userId : getUserId}).exec();
    if(!foundUser){
        return res.sendStatus(401);
    }

    if(foundUser.userName === getUserName && foundUser.dateOfBirth === getDateOfBirth && foundUser.email === getEmail){
        // 메일로 아이디를 발급하는 코드.
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = {getMethod, postMethod}