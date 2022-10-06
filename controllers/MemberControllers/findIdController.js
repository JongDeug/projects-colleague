const Member = require('../../model/Member');
const transporter = require('../../config/nodemailerOptions');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'findId.html'));
}

const postMethod = async (req, res) => {
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;

    if (!getUserName | !getDateOfBirth | !getEmail) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }

    const foundUser = await Member.findOne({ userName: getUserName, dateOfBirth: getDateOfBirth, email: getEmail }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // 메일로 아이디를 발급하는 코드.
    let info = await transporter.sendMail({
        from: `"SEMOBAN 👻" <${process.env.GMAIL_USER}>`, // sender address
        to: `${foundUser.email}`, // list of receivers
        subject: "세모반 [아이디 찾기]", // Subject line
        text: "semoban", // plain text body
        html: `<h1>안녕하세요! ${foundUser.userName} 회원님! </h1>
                   <p>회원님의 아이디는 ${foundUser.userId} 입니다!`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    const responseData = {
        redirect: '/',
    }
    res.status(200).json({ responseData });
}

module.exports = { getMethod, postMethod }