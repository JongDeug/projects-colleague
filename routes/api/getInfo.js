const express = require('express');
const router = express.Router();
const Member = require('../../model/Member');

router.get('/getInfo', async (req, res) => {
    const userId = req.userId;

    const foundUser = await Member.findOne({ userId: userId });
    if (!foundUser) {
        return res.sendStatus(401);
    }

    const responseData = {
        userId : foundUser.userId,
        dateOfBirth : foundUser.dateOfBirth,
        email : foundUser.email,
        interestKeywords : foundUser.interestKeywords
    }

    res.status(200).json({responseData});
});

module.exports = router;