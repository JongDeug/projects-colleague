const User = require('../../model/User');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'changeInfo.html'));
}

const putMethod = async (req, res) => {
    const userId = req.userId;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const interestKeywords = req.body.interestKeywords;

    if(!dateOfBirth || !email || !interestKeywords){
        return res.sendStatus(401).json({"message" : "값을 좀 넣어봐"});
    }

    const foundUser = await User.DB.findOne({userId : userId}).exec();
    if(!foundUser){
        return res.sendStatus(401);
    }

    foundUser.dateOfBirth = dateOfBirth;
    foundUser.email = email;
    foundUser.interestKeywords = interestKeywords;
    await foundUser.save();

    const responseData = {
        redirect : '/member/changeInfo',
    }
    res.status(200).json({responseData});
}


module.exports = { getMethod, putMethod }