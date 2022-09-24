const User = require('../../model/User');
const path = require('path');

const get = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) { // !cookies && !cookies.jwt
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.DB.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }

    // refreshToken db에서 지우기
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    // jwt(refreshToken) client에서 지우기
    res.clearCookie('jwt', { httpOnly: true });

    const redirect = '/';
    res.status(204).json({redirect});
}

module.exports = { get }