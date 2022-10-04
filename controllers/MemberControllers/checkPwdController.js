const Member = require('../../model/Member');
const bcrypt = require('bcryptjs');

const putMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getPassword = req.body.password;
    const getWhich = req.body.which;

    if (getWhich === 'checkPwd') {
        if (!getPassword) {
            return res.status(401).json({ 'message': 'There is missing data' });
        }

        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        const match = await bcrypt.compare(getPassword, foundUser.password);
        if (match) {
            const responseData = {
                redirect: '/member/changeInfo',
                result : 1
            }
            res.status(200).json({ responseData });
        }
        else {
            res.sendStatus(401);
        }
    }
    else if(getWhich === 'changeInfo'){
        next();
    }
}

module.exports = { putMethod };