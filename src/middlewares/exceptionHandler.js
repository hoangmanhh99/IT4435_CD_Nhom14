// module.exports = (err, req, res, next) => {
//     console.log("đay là file exception handler nhé: \n", err)
//     try{
//     res.status(err.code).send({status: err.code, errors: err.message});
//     }
//     catch(e){
//         res.status(404).send({status: err.code, errors: err.message});
//     }
//     finally{
//         next();
//     }
// }

const codes = require('../errors/code');
const { getErrorMessage } = require('../errors/message');

const exceptionHandler = (err, req, res, next) => {
    // console.log("err = ", err)
    let statusCode = err.code;
    let code = err.code || codes.INTERNAL_SERVER_ERROR;
    let {message}= err;
    switch(code){
        case codes.UNAUTHORIZED:
            message = "unauthorized!";
            break;
        case codes.NOT_FOUND:
            message = "not found!";
            break;
        case codes.TOO_MANY_REQUESTS:
            message = "too many requests!";
            break;
        case codes.BAD_REQUEST:
            message = "bad request!";
            break;
        case codes.INTERNAL_SERVER_ERROR:
            message = "server error!";
            break;
        default:
            statusCode = 200;
            message = getErrorMessage(code);              
    }

    res.status(statusCode).send(
        code 
        ? 
        {status: 0, code, message}
        : 
        {status: 0, message}
    );

}

module.exports = exceptionHandler;
