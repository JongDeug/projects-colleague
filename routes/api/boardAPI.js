const express = require('express');
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const crudController = require("../../controllers/BoardControllers/crudController");
const readPostDetailController = require("../../controllers/BoardControllers/readPostDetailController");
const likeHitController = require("../../controllers/BoardControllers/likeHitController");
/**
 * create, read, update, delete [board]
 */
router.route('/crud')
    .get(crudController.getMethod)
    .post(crudController.postMethod)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),crudController.putMethod)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),crudController.deleteMethod)

router.route('/:postId')
    .get(readPostDetailController.getMethod);

router.route('/like/:postId')
    .get(likeHitController.getMethod);
    
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