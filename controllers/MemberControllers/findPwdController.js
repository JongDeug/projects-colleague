const Member = require('../../model/Member');
const path = require('path');
const transporter = require('../../config/nodemailerOptions');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'findPwd.html'));
}

const postMethod = async (req, res) => {
    const getUserId = req.body.userId;
    const getEmail = req.body.email;

    const foundUser = await Member.findOne({ userId: getUserId, email: getEmail }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // DB 랜덤 비번으로 변경하기
    const randomPassword = crypto.randomBytes(8).toString('hex');
    console.log(randomPassword);

    const hashedPwd = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
                if (err) { reject(err); }
                resolve(hash);
            });
        });
    });

    foundUser.password = hashedPwd;
    foundUser.save();


    // 메일로 아이디를 발급하는 코드.
    transporter.sendMail({
        from: `"SEMOBAN 👻" <${process.env.GMAIL_USER}>`, // sender address
        to: `${foundUser.email}`, // list of receivers
        subject: "세모반 [비밀번호 찾기]", // Subject line
        text: "semoban", // plain text body
        html: `<h1>안녕하세요! ${foundUser.userName} 회원님! </h1>
                   <p>회원님의 변경된 비밀번호는 ${randomPassword} 입니다!`, // html body
    }, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ 'message': 'Unable to send email' });
        } else {
            console.log('Successfully Send Email: %s', info.response);
        }
    });

    const responseData = {
        redirect: '/',
    }
    res.status(200).json({ responseData });
}

module.exports = { getMethod, postMethod }