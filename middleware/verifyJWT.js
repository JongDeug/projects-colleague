const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // const authHeader = req.session.accessToken;
    console.log(`auth : ${authHeader}`);
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token, // accessToken
        process.env.ACCESS_TOKEN_SECRET, // .env 파일, accessToken 확인을 위해 맨처음 만든 암호 코드
        (err, decoded) => {
            if(err) return res.sendStatus(403) // invalid token

            // decoded 해서 req에 원하는 값 넣어서 나중에 사용 가능.
            req.userId = decoded.UserInfo.userId; 
            req.password = decoded.UserInfo.password;
            req.dateOfBirth = decoded.UserInfo.dateOfBirth;
            req.email = decoded.UserInfo.email;
            req.interestKeywords = decoded.UserInfo.interestKeywords

            next();
        }
    )
}

module.exports = verifyJWT;