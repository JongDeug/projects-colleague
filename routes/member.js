const express = require('express');
const MemberController = require('../controllers/memberController');
const router = express.Router();
const memberController = require('../controllers/memberController');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * /register
 */
router.route('/register')
    .get(memberController.register.get)
    .post(memberController.register.post);
// router.get('/register', memberController.register.get);
// router.post('/register', memberController.register.post);

/**
 * /login
 */
router.route('/login')
    .get(memberController.login.get)
    .post(memberController.login.post)
// router.get('/login', memberController.login.get);
// router.post('/login', memberController.login.post);

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
router.route('/leaveId')
    .get(memberController.leaveId.get)
    .delete(verifyJWT, memberController.leaveId.delete);
// router.get('/leaveId', memberController.leaveId.get);
// router.delete('/leaveId', memberController.leaveId.delete);

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