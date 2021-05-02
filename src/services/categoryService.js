const categoryDao = require('../daos/categoryDao');
const {folder} = require('../configs/s3.config');
const {uploadToS3} = require('./aws');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

// create a new category
const create = async (data, imageFile) => {
    if(imageFile){
        let pathImage = await uploadToS3(imageFile.buffer, imageFile.originalname, folder.IMAGES);
        data.cover_image = {
            name: imageFile.originalname,
            encoding: imageFile.encoding,
            mimetype: imageFile.mimetype,
            size: imageFile.size,
            path: pathImage
        }
    }
    let category = await categoryDao.create(data);
    return category;
}

// update a category existing
const update = async (data, categoryId) => {
    let category = await categoryDao.update(categoryId, data);
    if(!category)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    return category;
}

// get a category by id
const getById = async (categoryId) => {
    let category = await categoryDao.getById(categoryId);
    if(!category)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    
    return category;
}

// delete a category by id
const deleteById = async (categoryId) => {
    await categoryDao.deleteById(categoryId);
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
}
