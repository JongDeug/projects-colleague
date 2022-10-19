const express = require('express');
const router = express.Router();
const leaveIdController = require('../../controllers/MemberControllers/leaveIdController');
const changePwdController = require('../../controllers/MemberControllers/changePwdController');
const changeInfoController = require('../../controllers/MemberControllers/changeInfoController');
const findIdController = require('../../controllers/MemberControllers/findIdController');
const findPwdController = require('../../controllers/MemberControllers/findPwdController');

router.route('/leaveId')
    .delete(leaveIdController.deleteMethod);

router.route('/changePwd')
    .put(changePwdController.putMethod);

router.route('/changeInfo')
    .get(changeInfoController.getMethod)
    .put(changeInfoController.putMethod);

router.route('/findId')
    .post(findIdController.postMethod)

router.route('/findPwd')
    .post(findPwdController.postMethod)

module.exports = router;