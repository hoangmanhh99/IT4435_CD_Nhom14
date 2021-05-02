const {Item} = require('../models/index');

// create new item document in Database
const create = async (object) => {
    const item = await Item.create(object);
    return item;
}

// get an item by its id
const getById = async (id) => {
    const item = await Item.findById(id);
    return item;
}

// udate an item by its id
const update = async (id, object) => {
    const item = await Item.findByIdAndUpdate(id, object, {new: true});
    return item;
}

// delete an item by its id
const deleteById = async (id) => {
      await Item.findByIdAndDelete(id);
}


module.exports = {
    create,
    update,
    getById,
    deleteById
}