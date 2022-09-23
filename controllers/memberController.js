const loginController = require('./MemberControllers/loginController');
const logoutController = require('./MemberControllers/logoutController');
const registerController = require('./MemberControllers/registerController');
const refreshTokenController = require('./MemberControllers/refreshTokenController')

const MemberController = {
    login : loginController.handleLogin, //post
    logout : logoutController.handleLogout,
    register : registerController.handleNewUser,
    refreshToken : refreshTokenController.handleRefreshToken
}


module.exports = MemberController;