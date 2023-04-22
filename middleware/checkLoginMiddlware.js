const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports.checkLoginMiddleware = async(req, res, next)=> {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    try {

        const decoded =await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        
        next();

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'no login data found'
        })
    }
}