const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    // 쿠키에서 refreshToken 가져오기
    const cookies = req.cookies;
    if (!cookies?.jwt) { // -> !cookies && !cookies.jwt
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    // DB 와 비교
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
        // 1. 인증하려는 토큰
        refreshToken,
        // 2. refresh 토큰 생성할 때 썼던 암호키  
        process.env.REFRESH_TOKEN_SECRET,

        (err, decoded) => {
            // checking
            if (err || foundUser.username != decoded.username) {
                return res.sendStatus(403);
            }

            // 새로운 accessToken 생성
            const accessToken = jwt.sign(
                { "username": foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };