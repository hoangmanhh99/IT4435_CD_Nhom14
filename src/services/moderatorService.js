const bcrypt = require('bcrypt');
const errorCodes = require('../errors/code');
const CustomError = require('../errors/CustomError');
const message = require('../errors/message')
const moderatorDao = require('../daos/moderatorDao');
const Moderator = require('../models/Moderator')
const roleDao = require('../daos/roleDao');
const {generateAccessToken} = require('../utils/gen');



// const verifyAccessToken = async (accessToken) => {
//     const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
//     const {moderatorId} = data;
//     const moderator = await moderatorDao.findModerator(moderatorId);
//     return moderator;
// }

const login = async ({email, password}) => {
    let moderator = await moderatorDao.findModerator({email});
    if(!moderator) 
        return new CustomError(errorCodes.MODERATOR_NOT_FOUND, "not found moderator!");

    let match = await bcrypt.compare(password, moderator.password);
    if(!match)
        return new CustomError(errorCodes.WRONG_PASSWORD);
    
    const accessToken = await generateAccessToken(moderator._id);
    moderator.token = accessToken
    await moderator.save()
    return {accessToken, name: moderator.name};
}

const register = async ({email, name, password, roleName}) => {
    const tmp = await moderatorDao.findModerator({email})
    if(tmp) {
        return new CustomError(errorCodes.MODERATOR_EXISTING);
    }

    console.log("debugging...")
    let salt = bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);

    const roles = await roleDao.findRole(roleName);
    if(!roles) 
        return new CustomError(errorCodes.NOT_FOUND);

    const roleId = roles._id;
    const role = roleName
    let moderator = new Moderator({email, name, password, roleId, role});
    const accessToken = await generateAccessToken(moderator._id);
    moderator.token = accessToken
    await moderator.save()
    return message.getSuccess(moderator, "OK");
}


// const changeAvatar = async (avatar) => {

// }


// /**
//  * sau nay se viet chuc nang thay doi role cho moderator
//  * 
//  */
// const changeRole = async ({moderatorId, roles}) => {

// }



module.exports = {
    register,
    login,
    // changeAvatar,
}