const {Singer} = require('../models/index');

const create = async (object) => {
    const singer = await Singer.create(object);
    return singer;
}

const getById = async (id) => {
    const singer = await Singer.findById(id);
    return singer;
}

const update = async (id, object) => {
    const singer = await Singer.findByIdAndUpdate(id, object, {new: true});
    return singer;
}

const deleteById = async (id) => {
      await Singer.findByIdAndDelete(id);
}



module.exports = {
    create,
    update,
    getById,
    deleteById
}