const itemDao = require('../daos/itemDao');
const {folder} = require('../configs/s3.config');
const {uploadToS3,uploadFirebase} = require('./aws');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

// create new item
const create = async (data, file) => {
    if(file){
        let pathCover = await uploadFirebase(file,folder.IMAGES );
        data.cover_image = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathCover
        }
    }
    
    let item = await itemDao.create(data);
    return item;
}

// udate an item
const update = async (data, itemId) => {
    let item = await itemDao.update(itemId, data);
    if(!item)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    return item;
}

// get an item by its id
const getById = async (itemId) => {
    let item = await itemDao.getById(itemId);
    if(!item)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    
    return item;
}

// delete an item by its id
const deleteById = async (itemId) => {
    await itemDao.deleteById(itemId);
}

// udate cover image
const updateCoverImage = async (file, itemId) => {
    if(file){
        console.log(`starting upload image for item: ${itemId}`);
        let pathCover = await uploadFirebase(file,folder.IMAGES );
        let cover_image = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathCover
        }
        let item = await itemDao.update(itemId, {cover_image});
        if(!item)
            throw new CustomError(codes.NOT_FOUND, "not found");
        return item;
    }
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateCoverImage
}
