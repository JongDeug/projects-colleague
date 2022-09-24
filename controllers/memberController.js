const loginController = require('./MemberControllers/loginController');
const logoutController = require('./MemberControllers/logoutController');
const registerController = require('./MemberControllers/registerController');
const refreshTokenController = require('./MemberControllers/refreshTokenController')

const MemberController = {
    register: {
        get: registerController.get,
        post: registerController.post
    },
    login: {
        post: loginController.post,
        get: loginController.get
    },
    logout: {
        get: logoutController.get,
    },
    refreshToken: {
        get: refreshTokenController.get
    }
}


module.exports = MemberController;