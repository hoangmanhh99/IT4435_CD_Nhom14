const {Album} = require('../models/index');

// create new album document in Database
const create = async (object) => {
    const album = await Album.create(object);
    return album;
}

// get an album by its id
const getById = async (id) => {
    const album = await Album.findById(id);
    return album;
}

// udate an album by its id
const update = async (id, object) => {
    const album = await Album.findByIdAndUpdate(id, object, {new: true});
    return album;
}

// delete an album by its id
const deleteById = async (id) => {
      await Album.findByIdAndDelete(id);
}


module.exports = {
    create,
    update,
    getById,
    deleteById
}