const {Category} = require('../models/index');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

// create new category
const create = async (object) => {
    const category = await Category.create(object);
    return category;
}

// get category by ID
const getById = async (id) => {
    const category = await Category.findById(id);
    return category;
}

// update category
const update = async (id, object) => {
    const category = await Category.findByIdAndUpdate(id, object, {new: true});
    return category;
}

// delete category by id
const deleteById = async (id) => {
    // await Category.findByIdAndDelete(id);
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new CustomError(codes.NOT_FOUND, "category not exists")
    }
}



module.exports = {
    create,
    update,
    getById,
    deleteById
}