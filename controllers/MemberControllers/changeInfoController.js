const Member = require('../../model/Member');

const getMethod = async (req, res, next) => {
    const userId = req.userId;

    try {
        const foundUser = await Member.findOne({ userId: userId });
        if (!foundUser) {
            return res.sendStatus(401);
        }

        const responseData = {
            userId: foundUser.userId,
            dateOfBirth: foundUser.dateOfBirth,
            email: foundUser.email,
            interestKeywords: foundUser.interestKeywords,
            messgae: 'changeInfo get request complete'
        }
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const putMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if (!getDateOfBirth || !getEmail || !getInterestKeywords) {
        return res.sendStatus(401).json({ 'message': 'There is missing data.' });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        foundUser.dateOfBirth = getDateOfBirth;
        foundUser.email = getEmail;
        foundUser.interestKeywords = getInterestKeywords;
        await foundUser.save();

        const responseData = {
            redirect: '/',
            message: 'changeInfo put request complete'
        }
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}


module.exports = { getMethod, putMethod }