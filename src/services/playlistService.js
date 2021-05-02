const Playlist = require('../models/Playlist');
const {folder} = require('../configs/s3.config');
const {uploadToS3} = require('./aws');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');

// create a new playlist
const create = async (data, imageFile) => {
    let pathImage = await uploadToS3(imageFile.buffer, imageFile.originalname, folder.IMAGES);
    data.cover_image = {
        name: imageFile.originalname,
        encoding: imageFile.encoding,
        mimetype: imageFile.mimetype,
        size: imageFile.size,
        path: pathImage
    }
    let playlist = await Playlist.create(data);
    return playlist;
}

// update a playlist existing
const update = async (data, playlistId) => {
    let playlist = await Playlist.findByIdAndUpdate(playlistId, data);
    if(!playlist)
        return new CustomError(codes.NOT_FOUND, "not found!");
    return playlist;
}

// get a playlist by id
const getById = async (playlistID) => {
    let playlist = await Playlist.findById(playlistID);
    if(!playlist)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    
    return playlist;
}

// delete a playlist by id
const deleteById = async (playlistID) => {
    await Playlist.findByIdAndDelete(playlistID);
}

module.exports = {
    create,
    update,
    getById,
    deleteById,
}
