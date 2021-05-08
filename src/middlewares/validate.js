//const {body, validationResult} = require('express-validator');
//Validation
const Joi = require('joi');

// const CustomError = require('../errors/CustomError')
// const errorCodes = require('../errors/code');
// const apiTypes = {
//     LOGIN: 'login',
//     REGISTER: 'register'

// }

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required() //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    return schema.validate(data) ;
}

// Register validation 
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required() //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    return schema.validate(data) ;
}

// const getValidateResult = (req, res, next) => {
//     const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       let msgs = errors.array().map(element => element.msg);
//       let message = msgs.toString();
//     throw new CustomError(errorCodes.BAD_REQUEST, message, errors.array().shift().msg);
//   }
//   next();
// }


// module.exports = {
//     getValidateResult,
//     validate,
//     apiTypes
// }

module.exports={
    registerValidation, 
    loginValidation 
}