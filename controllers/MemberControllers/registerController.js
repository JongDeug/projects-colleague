const User = require('../../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const data = new User.DTO(); 
    data.setUsername = req.body.username;
    data.setPassword = req.body.password;
    data.setDateOfBirth = req.body.dateOfBirth;
    data.setEmail = req.body.email;
    data.setPet = req.body.pet;
    data.setInterestKeywords = req.body.interestKeywords;

    const requiredData = User.DTO.isEmpty(data);
    if(requiredData){
        return res.status(400).json({"Message": `${requiredData} 가 필요합니다.`});
    }

    // 중복 체킹
    const duplicate = await User.DB.findOne({ username: data.getUsername }).exec();
    if (duplicate) {
        return res.sendStatus(409); // conflict
    }

    try {
        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.getPassword, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

        // DB에 data저장
        const result = await User.DB.create({
            username: data.getUsername,
            password: hashedPwd,
            dateOfBirth: data.getDateOfBirth,
            email: data.getEmail,
            pet: data.getPet,
            interestKeywords: data.getInterestKeywords
        });
        console.log(result);

        res.status(201).json({ "success": `New user ${data.getUsername} created` });
    } catch (err) {
        res.status(500).json({ "messagegggg": err.message });
    }
}

module.exports = { handleNewUser };