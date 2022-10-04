const Member = require('../../model/Member');

const getMethod = async (req, res) => {
    const getCookies = req.cookies;
    if (!getCookies?.jwt) { // !cookies && !cookies.jwt
        return res.sendStatus(200); // No content
    }
    const getRefreshToken = getCookies.jwt;

    const foundUser = await Member.findOne({ refreshToken: getRefreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(200);
    }

    // refreshToken db에서 지우기
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    // jwt(refreshToken) client에서 지우기
    res.clearCookie('jwt', { httpOnly: true });

    const redirect = '/';
    res.status(200).json({redirect});
}

module.exports = { getMethod }