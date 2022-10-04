const loginController = require('./MemberControllers/loginController');
const logoutController = require('./MemberControllers/logoutController');
const registerController = require('./MemberControllers/registerController');
const refreshTokenController = require('./MemberControllers/refreshTokenController')
const leaveIdController = require('./MemberControllers/leaveIdController');
const changePwdController = require('./MemberControllers/changePwdController');
const changeInfoController = require('./MemberControllers/changeInfoController');
const checkPwdController = require('./MemberControllers/checkPwdController');

const memberController = {
    register: {
        get: registerController.getMethod,
        post: registerController.postMethod
    },
    login: {
        post: loginController.postMethod,
        get: loginController.getMethod
    },
    logout: {
        get: logoutController.getMethod,
    },
    refreshToken: {
        get: refreshTokenController.getMethod
    },
    leaveId: {
        get: leaveIdController.getMethod,
        delete: leaveIdController.deleteMethod
    },
    changePwd: {
        get: changePwdController.getMethod,
        put: changePwdController.putMethod
    },
    changeInfo: {
        get: changeInfoController.getMethod,
        put: changeInfoController.putMethod
    },
    checkPwd: {
        put: checkPwdController.putMethod
    }
}


module.exports = memberController;