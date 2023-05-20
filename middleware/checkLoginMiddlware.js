const jwt = require('jsonwebtoken');
const {promisify} = require('util');

require('dotenv').config()

module.exports.checkLoginMiddleware = async(req, res, next)=> {
    
    try {
    const token = req.headers.authorization?.split(" ")[1].replaceAll('"', '');
        const decoded =await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        console.log(decoded, "decoded token from jwt")
        req.user = decoded;
        console.log('decoded', decoded)
        next();

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'no login data found',
            error:error?.message
        })
    }
}