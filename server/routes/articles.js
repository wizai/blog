const express = require("express");
const multer = require("multer");

const ArticleController = require('../controllers/article');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const upload = multer();

router.post("", checkAuth, upload.none(), ArticleController.createArticle);

router.put('/:id', checkAuth, upload.none(), ArticleController.updateArticle);

router.get("", ArticleController.getArticles);

router.get("/:id", ArticleController.getArticle);

router.delete("/:id", checkAuth, ArticleController.deleteArticle);

module.exports = router;
