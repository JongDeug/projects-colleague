const express = require('express');
const router = express.Router();
const crudController = require('../../controllers/BoardControllers/crudController');

/**
 * create, read, update, delete [board]
 */
router.route('/crud')
    // 여기 get은 전체 리스트 가져오기.
    .get(crudController.getMethod)
    .post(crudController.postMethod)
    .put(crudController.putMethod)
    .delete(crudController.deleteMethod)


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