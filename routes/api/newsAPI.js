const express = require("express");
const router = express.Router();
const readNewsListController = require("../../controllers/NewsControllers/readNewsListController");
const readNewsArticleController = require("../../controllers/NewsControllers/readNewsArticleController");

// 목록, get인듯
router.route("/newsList")
  .post(readNewsListController.postMethod);

// 기사 상세, get인듯
router.route("/newsArticle")
  .post(readNewsArticleController.postMethod);

module.exports = router;
