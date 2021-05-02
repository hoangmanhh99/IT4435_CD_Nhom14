const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET_KEY} = require('../configs');

const authUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        req.user = undefined;
    } else {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) 
        const user = await User.findOne({ _id: decoded._id, 'token': token })
        if (!user) {
            req.user = undefined
        } else {
            req.token = token
            req.user = user
        }
    }
    next()
}

module.exports = authUser