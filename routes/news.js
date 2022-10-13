const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/newsList', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'newsList.html'));
})   

router.get('/newsArticleDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views', 'newsArticle.html'));
})

module.exports = router;