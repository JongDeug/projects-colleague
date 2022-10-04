const User = require('../../model/User');
const path = require('path');
const bcrypt = require('bcryptjs');

const putMethod = async (req, res, next) => {
    const userId = req.userId;
    const password = req.body.password;
    const which = req.body.which;

    if (which === 'checkPwd') {
        if (!password) {
            return res.status(401).json({ 'message': '입력해라,,' });
        }

        const foundUser = await User.DB.findOne({ userId: userId }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        const match = await bcrypt.compare(password, foundUser.password);
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
    else if(which === 'changeInfo'){
        next();
    }
}

module.exports = { putMethod };