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

module.exports = router;