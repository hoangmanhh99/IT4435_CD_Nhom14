const History = require('../models/History');

const create = async (data) => {
    return await History.create(data);
}

const update = async (data, userId) => {
    let history = History.findOneAndUpdate({userId}, data, {new: true});
    return history;
}

const getHistory = async (userId) => {
    let history = await (await History.findOne({userId}).populate('musicAudios musicVideos playlists', 'name cover_image _id singers').exec()).populate('singers');

    return history;
}

module.exports = {
    create,
    update,
    getHistory
}