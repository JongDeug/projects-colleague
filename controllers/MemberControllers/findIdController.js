const Member = require('../../model/Member');
const transporter = require('../../config/nodemailerOptions');
const responseDataForm = require("../../config/responseDataForm");

const postMethod = async (req, res, next) => {
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;

    if (!getUserName || !getDateOfBirth || !getEmail) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }

    try {
        const foundUser = await Member.findOne({ email: getEmail }).exec();
        if (!foundUser) {
            return res.sendStatus(401);
        }

        if (foundUser.userName === getUserName && foundUser.dateOfBirth === getDateOfBirth) {
            transporter.sendMail({
                from: `"SEMOBAN 👻" <${process.env.GMAIL_USER}>`, // sender address
                to: `${foundUser.email}`, // list of receivers
                subject: "세모반 [아이디 찾기]", // Subject line
                text: "semoban", // plain text body
                html: `<h1>안녕하세요! ${foundUser.userName} 회원님! </h1>
                   <p>회원님의 아이디는 ${foundUser.userId} 입니다!`, // html body
            }, (err, info) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ 'message': 'Unable to send email' });
                } else {
                    console.log('Successfully Send Email: %s', info.response);
                }
            });

            const responseData = responseDataForm("/", "findId post request complete", null);
                res.status(200).json({ responseData });
        } else {
            res.status(401).json({ "message": "입력하신 회원 정보에 맞는 아이디를 찾을 수 없습니다." });
        }

    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod }