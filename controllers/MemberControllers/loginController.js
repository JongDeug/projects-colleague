const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const data = new User.DTO();
    data.setUsername = req.body.username;
    data.setPassword = req.body.password;

    // front 에서 user, pwd 데이터 받아오기 
    if (!data.getUsername || !data.getPassword) {
        return res.status(400).json({ 'message': 'Username and Password are required' });
    }

    // DB 확인
    const foundUser = await User.DB.findOne({ username: data.getUsername }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // 데이터베이스에 있는 비밀번호와 사용자 입력 비밀번호 체킹
    const match = await bcrypt.compare(data.getPassword, foundUser.password);
    if (match) {

        // accessToken 생성
        const accessToken = jwt.sign(
            // 1. 넣을 정보
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "password": foundUser.password,
                    "dateOfBirth": foundUser.dateOfBirth,
                    "email": foundUser.email,
                    "pet": foundUser.pet,
                    "interestKeywords": foundUser.interestKeywords
                }
            },

            // 2. .env 파일, accessToken을 만들기 위해 처음 필요한 또다른 암호 코드
            process.env.ACCESS_TOKEN_SECRET,

            // 3. 시간
            { expiresIn: '60s' }
        );

        // refreshToken 생성
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // refreshToken DB에 저장
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // refreshToken front-end cookie에 저장. 그래야 DB랑 cookie랑 비교 가능.
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly는 javascript로 접근 불가능.
        const redirect =
            'member/complete';
        res.json({ accessToken, redirect });
        // req.session.accessToken = accessToken; // req는 다음으로 리다이렉팅 되면 전혀다른 값이구먼.

    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };