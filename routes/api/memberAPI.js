const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/MemberControllers/registerController');
const leaveIdController = require('../../controllers/MemberControllers/leaveIdController');
const changePwdController = require('../../controllers/MemberControllers/changePwdController');
const changeInfoController = require('../../controllers/MemberControllers/changeInfoController');
const checkPwdController = require('../../controllers/MemberControllers/checkPwdController');
const findIdController = require('../../controllers/MemberControllers/findIdController');
const findPwdController = require('../../controllers/MemberControllers/findPwdController');

router.route('/register')
    .post(registerController.postMethod);

router.route('/leaveId')
    .delete(leaveIdController.deleteMethod);

router.route('/changePwd')
    .put(changePwdController.putMethod);

router.route('/changeInfo')
    .get(changeInfoController.getMethod)
    .put([checkPwdController.putMethod, changeInfoController.putMethod]);

router.route('/findId')
    .post(findIdController.postMethod)

router.route('/findPwd')
    .post(findPwdController.postMethod)

module.exports = router;