const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

// root
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', '/views', 'index.html'));
    res.sendFile(path.join(__dirname, 'React/build/index.html'));
});


// memeber
// router.get('/member/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/views', 'register.html'));
// })

// router.get('/member/leaveId', (req, res)=>{
//     res.sendFile(path.join(__dirname, '..', '/views', 'leaveId.html'));
// })

// router.get('/member/changePwd', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/views', 'changePwd.html'));
// })

// router.get('/member/changeInfo', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/views', 'changeInfo.html'));
// })

// router.get('/member/findId', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/views', 'findId.html'));
// })

// router.get('/member/findPwd', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/views', 'findPwd.html'));
// })

// board

// news
router.get('/news/list', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'newsList.html'));
})   

router.get('/news/articleDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'newsArticleDetail.html'));
})

module.exports = router;
