const express = require('express');
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const postController = require("../../controllers/BoardControllers/postController");
const postDetailController = require("../../controllers/BoardControllers/postDetailController");
const commentController = require("../../controllers/BoardControllers/commentController");
const likeHitController = require("../../controllers/BoardControllers/likeHitController");
const searchPostController = require("../../controllers/BoardControllers/searchPostController");

const upload = require('../../middleware/upload');



router.route('/crud')
    .get(postController.getMethod)
    .post(upload.array('attachedFile'), postController.postMethod)
    .put(upload.array('attachedFile'), verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postController.putMethod)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postController.deleteMethod);

router.route('/comment/crud')
    .post(commentController.postMethod)
    .put(commentController.putMethod)
    .delete(commentController.deleteMethod);

router.route('/search')
    .post(searchPostController.postMethod);

router.route('/like/:postId')
    .get(likeHitController.getMethod);

// search route를 밑으로 내려버리면 /search가 postId로 들어가면서 오류 발생시킴.
// 즉 param은 젤 밑으로 내리는게 좋음.
router.route('/:postId/:method')
    .get(postDetailController.getMethod);

module.exports = router;