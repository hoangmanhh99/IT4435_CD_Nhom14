const Song = require('../models/Song');

const create = async (object) => {
    const song = await Song.create(object);
    return song;
}

const getById = async (id) => {
    const song = await Song.findById(id);
    return song;
}

const update = async (id, object) => {
    let song = await Song.findByIdAndUpdate(id, object, {new: true});
    return song;
}

const deleteById = async (id) => {
      await Song.findByIdAndDelete(id);
}

module.exports = {
    create,
    getById,
    update,
    deleteById
}