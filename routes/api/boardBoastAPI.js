const express = require('express');
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const postController = require("../../controllers/BoardControllers/postController");
const postDetailController = require("../../controllers/BoardControllers/postDetailController");
const commentController = require("../../controllers/BoardControllers/commentController");
const likeHitController = require("../../controllers/BoardControllers/likeHitController");
const searchPostController = require("../../controllers/BoardControllers/searchPostController");
const post = require('../../model/PostBoast');
const comment = require('../../model/CommentBoast');
const setDB = require('../../middleware/setDB');
const upload = require('../../middleware/upload');

router.route('/crud')
    .get(setDB(postController, post, comment), postController.getMethod)
    .post(setDB(postController, post, comment), upload.array('attachedFile'), postController.postMethod)
    .put(setDB(postController, post, comment), upload.array('attachedFile'), verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postController.putMethod)
    .delete(setDB(postController, post, comment), verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postController.deleteMethod);

router.route('/comment/crud')
    .post(setDB(commentController, post, comment), commentController.postMethod)
    .put(setDB(commentController, post, comment), commentController.putMethod)
    .delete(setDB(commentController, post, comment), commentController.deleteMethod);

router.route('/search')
    .post(setDB(searchPostController, post, comment), searchPostController.postMethod);

router.route('/like/:postId')
    .get(setDB(likeHitController, post, comment), likeHitController.getMethod);

// search route를 밑으로 내려버리면 /search가 postId로 들어가면서 오류 발생시킴.
router.route('/:postId/:method')
    .get(setDB(postDetailController, post, comment), postDetailController.getMethod);

module.exports = router;