const loginController = require('./MemberControllers/loginController');
const logoutController = require('./MemberControllers/logoutController');
const registerController = require('./MemberControllers/registerController');
const refreshTokenController = require('./MemberControllers/refreshTokenController')
const leaveIdController = require('./MemberControllers/leaveIdController');

const MemberController = {
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
    }
}


module.exports = MemberController;