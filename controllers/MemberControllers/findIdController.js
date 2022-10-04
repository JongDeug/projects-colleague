const Member = require('../../model/Member');
const path = require('path');

const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'findId.html'));
}

const postMethod = async (req, res) => {
    const getUserId = req.userId;
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;

    
}

module.exports = {getMethod, postMethod}