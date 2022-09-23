const express = require('express');
const router = express.Router();
const path = require('path');
const memberController = require('../controllers/memberController');

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.get('/complete', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'redirect.html'), (err) => {
        if (err) {
            next(err);
        }
        else {
            console.log('sent');
        }
    });
})
router.get('/logout', memberController.logout);
router.get('/refresh', memberController.refreshToken);



module.exports = router;