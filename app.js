const express = require('express')
const { default: mongoose } = require('mongoose');
const { User } = require('./models/user');
const userModel = require('./models/user');
const postRouter = require('./routers/posts.router');
const userRouter = require('./routers/user.route');
const cors = require('cors')


const app = express();
app.use(express.json())
app.use(cors())



app.use("/", postRouter);
app.use("/", userRouter)

app.post("/postone", async(req, res, next)=> {
    await userModel.create({
        email:'mim222@gmail.com',
        name:'mim'
    })
    res.status(200).json({
        "message":"added"
    })
})

app.get("/", (req, res)=> {
    return res.status(200).json({
        message:'app view page'
    })
})

module.exports = app;