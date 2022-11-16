const express = require('express');
const router = express.Router();
const postController = require("../controllers/BoardControllers/postController");
const searchPostController = require("../controllers/BoardControllers/searchPostController");
const postDetailController = require("../controllers/BoardControllers/postDetailController");
const Post = require('../../model/PostAnything');

router.get("/read", postController.getMethod(Post));
router.get("/search", searchPostController.postMethod(Post));
router.get("/:postId/:method", postDetailController.getMethod(Post, Comment));


module.exports = router;