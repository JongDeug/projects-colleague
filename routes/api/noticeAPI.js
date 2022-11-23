const express = require("express");
const router = express.Router();
const noticeController = require("../../controllers/NoticeControllers/noticeController");

router.get("/", noticeController.getMethod);

module.exports = router;