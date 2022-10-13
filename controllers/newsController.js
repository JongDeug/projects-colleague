const newsListController = require("./NewsControllers/newsListController");
const newsArticleController = require("./NewsControllers/newsArticleController");

const newsController = {
    newsList: {
        get: newsListController.getMethod,
        post: newsListController.postMethod,
    },
    newsArticle: {
        get: newsArticleController.getMethod,
        post: newsArticleController.postMethod,
    },
};

module.exports = newsController;
