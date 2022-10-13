const readNewsListController = require("./NewsControllers/readNewsListController");
const readNewsArticleController = require("./NewsControllers/readNewsArticleController");

const newsController = {
    readNewsList: {
        get: readNewsListController.getMethod,
        post: readNewsListController.postMethod,
    },
    readNewsArticle: {
        get: readNewsArticleController.getMethod,
        post: readNewsArticleController.postMethod,
    },
};

module.exports = newsController;
