
const express = require('express');
const { getAllPostsController, createPostController } = require('../controllers/postController');
const { checkLoginMiddleware } = require('../middleware/checkLoginMiddlware');

const postRouter = express.Router();

postRouter.get("/posts", checkLoginMiddleware, getAllPostsController);
postRouter.post("/post", checkLoginMiddleware, createPostController)

module.exports = postRouter;