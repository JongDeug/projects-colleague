const express = require('express');
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

/**
 * changePwd
 */
router.route('/changePwd')
    .get(memberController.changePwd.get)
    .put(verifyJWT, memberController.changePwd.put);

/**
 * changeInfo
 */
router.route('/changeInfo')
    .get(memberController.changeInfo.get)
    .put(verifyJWT, memberController.changeInfo.put);
// router.get
// router.put

/**
 * checkPwd
 */
// router.route('/checkPwd')
    // .get(member)

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