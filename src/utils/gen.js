const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIRE_TIME } = require('../configs/index');

const generateAccessToken = async function (userId) {

    const accessToken = await jwt.sign({_id: userId.toString()}, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE_TIME
    });
    return accessToken;
}

module.exports = {
    generateAccessToken,
}