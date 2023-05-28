const jwt = require('jsonwebtoken');
const {promisify} = require('util');

require('dotenv').config()

module.exports.checkLoginMiddleware = async(req, res, next)=> {
    try {
    const token = await req.headers.authorization?.split(" ")[1];
        const decoded =await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
       return res.status(400).json({
            status: 'fail',
            message: 'no login data found',
            error:error?.message
        })
    }
}