const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

/**
 * /register
 */
router.get('/register', memberController.register.get);
router.post('/register', memberController.register.post);

/**
 * /login
 */
router.get('/login', memberController.login.get);
router.post('/login', memberController.login.post);

/**
 * /logout
 */
router.get('/logout', memberController.logout.get);

/**
 * /refresh
 */
router.get('/refresh', memberController.refreshToken.get);

/**
 * leavId
 */
router.get('/leaveId', memberController.leaveId.get);
router.delete('/leaveId', memberController.leaveId.delete);

/**
 * changePwd
 */
// router.get
// router.put // put은 데이터를 다 보내야된다네

/**
 * changeInfo
 */
// router.get
// router.put

/**
 * findId
 */
// router.get
// router.post

/**
 * findPwd
 */
// router.get
// router.post


module.exports = router;