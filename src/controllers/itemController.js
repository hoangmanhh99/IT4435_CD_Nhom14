const {itemService} = require('../services/index');

// create new item
const create = async (req, res) => {
    const file = req.file;
    var data = req.body;
    const item = await itemService.create(data, file);
    return res.send({status: 1, result: {item}});
}

// update an item by its id
const update = async (req, res) => {
    const data = req.body;
    const itemId = req.params.itemId;
    const item = await itemService.update(data, itemId);
    return res.send({status: 1, result: {item}});
}

// get an item by its id
const getById = async (req, res) => {
    const itemId = req.params.itemId;
    const item = await itemService.getById(itemId);
    return res.send({status: 1, result: {item}});
}

// pagination
// @TODO
// const getAll = async (req, res) => {
    
// }

// delete an item by its id
const deleteById = async (req, res) => {
    const itemId = req.params.itemId;
    await itemService.deleteById(itemId);
    return res.send({status: 1, result: {message: "delete OK!"}});
}

// update image for an item
const updateCoverImage = async (req, res) => {
    const itemId = req.params.itemId;
    const file = req.file;
    const item = await itemService.updateCoverImage(file, itemId);
    return res.send({status: 1, result: {item}});
}


module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateCoverImage

}