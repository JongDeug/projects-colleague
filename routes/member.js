const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'register.html'));
})

router.get('/leaveId', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '/views', 'leaveId.html'));
})

router.get('/changePwd', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'changePwd.html'));
})

router.get('/changeInfo', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'changeInfo.html'));
})

router.get('/findId', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'findId.html'));
})

router.get('/findPwd', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'findPwd.html'));
})

module.exports = router;