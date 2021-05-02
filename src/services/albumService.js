const albumDao = require('../daos/albumDao');
const {folder} = require('../configs/s3.config');
const {uploadToS3} = require('./aws');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

// create new album
const create = async (data, file) => {
    if(file){
        let pathCover = await uploadToS3(file.buffer, file.originalname, folder.IMAGES);
        data.cover_image = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathCover
        }
    }
    
    let album = await albumDao.create(data);
    return album;
}

// udate an album
const update = async (data, albumId) => {
    let album = await albumDao.update(albumId, data);
    if(!album)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    return album;
}

// get an album by its id
const getById = async (albumId) => {
    let album = await albumDao.getById(albumId);
    if(!album)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    
    return album;
}

// delete an album by its id
const deleteById = async (albumId) => {
    await albumDao.deleteById(albumId);
}

// udate cover image
const updateCoverImage = async (file, albumId) => {
    if(file){
        console.log(`starting upload image for album: ${albumId}`);
        let pathCover = await uploadToS3(file.buffer, file.originalname, folder.IMAGES);
        let cover_image = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathCover
        }
        let album = await albumDao.update(albumId, {cover_image});
        if(!album)
            throw new CustomError(codes.NOT_FOUND, "not found");
        return album;
    }
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateCoverImage
}
