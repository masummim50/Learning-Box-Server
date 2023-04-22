const express = require('express');
const { logInUserController } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/login", logInUserController);

module.exports = userRouter;