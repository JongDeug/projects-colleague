const Member = require('../../model/Member');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'changeInfo.html'));
}

const putMethod = async (req, res) => {
    const getUserId = req.userId;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if(!getDateOfBirth || !getEmail || !getInterestKeywords){
        return res.sendStatus(401).json({'message' : 'There is missing data.'});
    }

    const foundUser = await Member.findOne({userId : getUserId}).exec();
    if(!foundUser){
        return res.sendStatus(401);
    }

    foundUser.dateOfBirth = getDateOfBirth;
    foundUser.email = getEmail;
    foundUser.interestKeywords = getInterestKeywords;
    await foundUser.save();

    const responseData = {
        redirect : '/member/changeInfo',
    }
    res.status(200).json({responseData});
}


module.exports = { getMethod, putMethod }