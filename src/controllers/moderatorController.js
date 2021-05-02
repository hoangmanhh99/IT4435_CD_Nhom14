const {moderatorService} = require('../services/index');
const CustomError = require('../errors/CustomError');


const register = async (req, res, next) => {
    const {email, name, password, roleName} = req.body;
    if (!email || !name || !password || !roleName) {
        return next(new CustomError(400, "Bad Request!, Please add more info to request."));
    }
    const moderator = await moderatorService.register({email, name, password, roleName});
    console.log(moderator)
    return res.status(200).json({"status": 1, "result": moderator});
}

const login = async (req, res) => {
    console.log("req body ne: ", req.body);     
    const {email, password} = req.body;
    const accessToken = await moderatorService.login({email, password});
    return res.status(200).json({
        status: 1,
        result: accessToken
    });
}

// const verifyAccessToken = async (req, res) => {
//     const {accessToken} = req.body;
//     const {moderator} = await moderatorService.verifyAccessToken(accesstoken);
//     res.send({status: 1, result: {moderator}});
// }

module.exports = {
    register,
    login,
}