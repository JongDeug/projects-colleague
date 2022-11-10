const express = require('express');
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const postController = require("../../controllers/BoardControllers/postController");
const postDetailController = require("../../controllers/BoardControllers/postDetailController");
const commentController = require("../../controllers/BoardControllers/commentController");
const likeHitController = require("../../controllers/BoardControllers/likeHitController");
const searchPostController = require("../../controllers/BoardControllers/searchPostController");

    
router.route('/crud')
    .get(postController.getMethod)
    .post(postController.postMethod)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),postController.putMethod)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),postController.deleteMethod);

// search route를 밑으로 내려버리면 /search가 postId로 들어가면서 오류 발생시킴.
router.route('/:postId/:method')
    .get(postDetailController.getMethod);

    
router.route('/like/:postId')
    .get(likeHitController.getMethod);

router.route('/comment/crud')
    .post(commentController.postMethod)
    .put(commentController.putMethod)
    .delete(commentController.deleteMethod);

router.route('/search')
    .post(searchPostController.postMethod);


module.exports = router;