const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/newsList")
  .get(newsController.readNewsList.get)
  .post(newsController.readNewsList.post);

router
  .route("/newsArticle")
  .get(newsController.readNewsArticle.get)
  .post(newsController.readNewsArticle.post);

module.exports = router;
