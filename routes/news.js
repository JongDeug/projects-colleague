const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/newsList")
  .get(newsController.newsList.get)
  .post(newsController.newsList.post);

router
  .route("/newsArticle")
  .get(newsController.newsArticle.get)
  .post(newsController.newsArticle.post);

module.exports = router;
