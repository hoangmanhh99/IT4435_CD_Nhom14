const singerDao = require('../daos/singerDao');
const {folder} = require('../configs/s3.config');
const {uploadToS3} = require('./aws');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');


const create = async (data, file) => {
    if(file){
        let pathAvatar = await uploadToS3(file.buffer, file.originalname, folder.IMAGES);
        data.avatar = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathAvatar
        }
    }
    
    let singer = await singerDao.create(data);
    
    return singer;
}

const update = async (data, singerId) => {
    data.modifiedDate = Date.now();
    console.log("data = ", data);
    let singer = await singerDao.update(singerId, data);
    if(!singer)
        return new CustomError(codes.NOT_FOUND, "not found!");
    return singer;

}

const getById = async (singerId) => {
    let singer = await singerDao.getById(singerId);
    if(!singer)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    
    return singer;
}

const deleteById = async (singerId) => {
    await singerDao.deleteById(singerId);
}

const updateAvatar = async (file, singerId) => {
    if(file){
        let pathAvatar = await uploadToS3(file.buffer, file.originalname, folder.IMAGES);
        let avatar = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathAvatar
        }
        let singer = await singerDao.update(singerId, {avatar});
        if(!singer)
            throw new CustomError(codes.NOT_FOUND, "not found");
        return singer;
    }
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateAvatar
}
