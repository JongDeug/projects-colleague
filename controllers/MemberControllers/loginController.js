const Member = require('../../model/Member');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'login.html')); // login page
}

const postMethod = async (req, res) => {
    const getUserId = req.body.userId;
    const getPassword = req.body.password;

    // front 에서 user, pwd 데이터 받아오기 
    if (!getUserId || !getPassword) {
        return res.status(400).json({ 'message': 'UserId and Password are required' });
    }

    // DB 확인
    const foundUser = await Member.findOne({ userId: getUserId }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // 데이터베이스에 있는 비밀번호와 사용자 입력 비밀번호 체킹
    const match = await bcrypt.compare(getPassword, foundUser.password);
    if (match) {

        // accessToken 생성
        const accessToken = jwt.sign(
            // 1. 넣을 정보
            {
                "UserInfo": {
                    "userId": foundUser.userId,
                    "password": foundUser.password,
                    "userName": foundUser.userName,
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
            { "userId": foundUser.userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // refreshToken DB에 저장
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // refreshToken front-end cookie에 저장. 그래야 DB랑 cookie랑 비교 가능.
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly는 javascript로 접근 불가능.


        const responseData = {
            accessToken : accessToken,
            redirect : '/' 
        }
        res.status(200).json({ responseData });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { postMethod, getMethod };