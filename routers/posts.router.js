
const express = require('express');
const { getAllPostsController, createPostController, getFilteredPostsController } = require('../controllers/postController');
const { checkLoginMiddleware } = require('../middleware/checkLoginMiddlware');

const postRouter = express.Router();

postRouter.get("/posts", checkLoginMiddleware, getAllPostsController);
postRouter.post("/post", checkLoginMiddleware, createPostController);
postRouter.get("/filteredposts", getFilteredPostsController)

module.exports = postRouter;