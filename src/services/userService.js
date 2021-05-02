const bcrypt = require('bcrypt');
const errorCodes = require('../errors/code');
const CustomError = require('../errors/CustomError');
const message = require('../errors/message')
const userDao = require('../daos/userDao');
const {generateAccessToken} = require('../utils/gen');
const historyService = require('./historyService');
const {uploadToS3} = require('./aws');
const {folder} = require('../configs/s3.config');
const User = require('../models/User')

// const verifyAccessToken = async (accessToken) => {
//     const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
//     const {userId} = data;
//     const user = userDao.findUser(userId);
//     return user;
// }

const login = async (email, password) => {
    let user = await userDao.findUser({email});
    if(!user) 
        throw new CustomError(errorCodes.USER_NOT_FOUND);

    let match = await bcrypt.compare(password, user.password);
    if(!match)
        throw new CustomError(errorCodes.WRONG_PASSWORD);
    
    // const userId = user._id;
    const accesstoken = await generateAccessToken(user._id);
    user.token = accesstoken;
    await user.save();
    return {accesstoken, avatar: user.avatar.path, name: user.name};
}

const register = async ({email, name, password}) => {
    if (await userDao.findUser({email})) {
        throw new CustomError(errorCodes.USER_EXISTING);
    }

    let salt = bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    let user = new User({email, name, password})
    const accessToken = await generateAccessToken(user._id);
    // console.log(accessToken);
    user.token = accessToken;
    await user.save()
    await historyService.create(user._id);          // khoi tao lich su nghe nhac cho nguoi dung ngay sau khi dang ki

    return message.getSuccess({
        "user": user,
        "token": accessToken,
    }, "OK");
} 

const updateAvatar = async (userId, file) => {
    if(file){
        let pathAvatar = await uploadToS3(file.buffer, file.originalname, folder.IMAGES);
        let avatar = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathAvatar
        }
        console.log("avatar = ", avatar)
        let user = await User.findByIdAndUpdate(userId, {avatar});
        if(!user)
            throw new CustomError(errorCodes.NOT_FOUND, "not found");
        return user.avatar;
    }
    return null;
}

module.exports = {
    register,
    login,
    updateAvatar,
    //changeAvatar,
}