const express = require('express');
const router = express.Router();
const loginController = require('../controllers/AuthControllers/loginController');
const logoutController = require('../controllers/AuthControllers/logoutController');
const refreshTokenController = require('../controllers/AuthControllers/refreshTokenController')

router.route('/login')
    .get(loginController.getMethod)
    .post(loginController.postMethod);

router.route('/logout')
    .get(logoutController.getMethod);

router.route('/refresh')
    .get(refreshTokenController.getMethod);

module.exports = router;