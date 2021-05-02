const jwt = require('jsonwebtoken')
const Moderator = require('../models/Moderator')
const { JWT_SECRET_KEY } = require('../configs');
const CustomError = require('../errors/CustomError')

const authModerator = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    //console.log("token = ", token)
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    //console.log("decoded = ", decoded)
    const moderator = await Moderator.findOne({ _id: decoded._id, 'token': token })

    //console.log("moderator = ", moderator)

    if (!moderator) {
      throw new CustomError(404, 'Moderator is not exist.')
    }
    req.token = token
    req.moderator = moderator

    next()
  } catch (err) {
    return next(new CustomError(401, 'Please authenticate.'))
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.moderator.role)) {
      return next(
        new CustomError(
          403,
          `User role ${req.moderator.role} is not authorized to access this route`,
        )
      );
    }
    next();
  };
};

module.exports = {
  authModerator,
  authorize
}