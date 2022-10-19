const express = require('express');
const router = express.Router();
const boardController = require('../../controllers/BoardControllers/boardController');

/**
 * create, read, update, delete [board]
 */
router.route('/board')
    .get(boardController.getMethod)
    .post(boardController.postMethod)
    .put(boardController.putMethod)
    .delete(boardController.deleteMethod)


// 현수가 작성할 곳
/**
 * createComment
 */

/**
 * readComment
 */

/**
 * updateComment
 */

/**
 * deleteComment
 */

module.exports = router;