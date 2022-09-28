const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'leaveId.html'));
}

// body 
const deleteMethod = async (req, res) => {
    const userId = req.userId;
    const pwd = req.body.password;
    console.log(typeof userId);
    // body 비밀번호 유무 체킹
    if (!pwd) {
        res.status(400).json({ 'message': 'Password is required' });
    }

    const foundUser = await User.DB.findOne({ userId: userId }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // body 비밀번호 체킹
    console.log('여기??');
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //DB 삭제
        const result = await User.DB.deleteOne({userId : userId});
        console.log(result);
        const responseData = {
            message: 'delete complete',
            redirect: '/'
        }
        res.status(200).json({responseData});
    }
}


module.exports = { getMethod, deleteMethod };