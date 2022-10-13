const express = require('express');
const router = express.Router();
const createPostController = require('../../controllers/BoardControllers/createPostController');
const readPostListController = require('../../controllers/BoardControllers/readPostListController');
const updatePostController = require('../../controllers/BoardControllers/updatePostController');
const deletePostController = require('../../controllers/BoardControllers/deletePostController');

/**
 * createPost
 */
router.route('/createPost')
    .post(createPostController.postMethod);

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