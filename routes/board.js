const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

/**
 * createPost
 */
router.route('/createPost')
    .get(boardController.createPost.get)
    .post(boardController.createPost.post)

/**
 * readPostList
 */
// router.route('/readPostList')
//     .get(boardController.readPostList.get)
// get, api get도 만들어야.

/**
 * updatePost
 */
// router.route('/updatePost')
    // .get(boardController.updatePost.get)
    // .put(boardController.updatePost.put)
// get, put

/**
 * deletePost
 */
// router.route('/deletePost')
    // .get(boardController.deletePost.get) //get이 필요 없을 수도.
    // .delete(boardController.deletePost.delete)


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