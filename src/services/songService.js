const songDao = require('../daos/songDao');
const Song = require('../models/Song')
// const History = require('../models/History');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const { uploadToS3, uploadFirebase } = require('./aws');
const {folder} = require('../configs/s3.config');
const {MUSIC_TYPE} = require ('../constants/index');

const historyService = require('./historyService');
/* ========== ADMIN ================== */

/**
 * TODO: chưa check mimetype request về
 * @param {*} data 
 * @param {*} files 
 */
const create = async (data, musicFile, imageFile) => {
    let categories = [];
    let singers = [];

    if(data.categories)
        data.categories = data.categories.split(',');
    if(data.singers)
        data.singers = data.singers.split(',');

    if(musicFile){
        let pathMusicFile = await uploadFirebase(musicFile, folder.MUSIC);

        data.file= {
            name: musicFile.originalname,
            encoding: musicFile.encoding,
            mimetype: musicFile.mimetype,
            size: musicFile.size,
            path: pathMusicFile
        }
        if(imageFile){
            let pathImage = await uploadFirebase(imageFile, folder.IMAGES);
            data.cover_image = {
                name: imageFile.originalname,
                encoding: imageFile.encoding,
                mimetype: imageFile.mimetype,
                size: imageFile.size,
                path: pathImage
            }
        }
        data.type = setMusicType(data.file.mimetype);
        console.log("data: ", data);
        let song = await songDao.create(data);
        return song;
    }
    
    else{
        return new CustomError(codes.FILE_INVALID, "file is invalid, not match!");
    }
}


const setMusicType = (mimetype) => {
    return mimetype.includes('audio') ? MUSIC_TYPE.MA : MUSIC_TYPE.MV;
}

const update = async (data, songId) => {
    let song = await songDao.update(songId, data);
    if(!song)
        return new CustomError(codes.NOT_FOUND, "not found!");
    return song;
}

const getById = async (songId) => {
    let song = await songDao.getById(songId);
    if(!song)
        throw new CustomError(codes.NOT_FOUND, "not found!");
    return song;
}

const updateCoverImage = async (file, songId) => {
    if(file){
        let pathImage = await uploadFirebase(file, folder.IMAGES);
        let cover_image = {
            name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            path: pathImage
        }

        let song = await songDao.update(songId, {"cover_image": cover_image, "modifiedDate": Date.now()});
        if(!song)
            throw new CustomError(codes.NOT_FOUND, "not found!");
        return song;
    }
    else{
        throw new CustomError(codes.FILE_INVALID, "file is invalid, not match!");
    }
}


/**
 * TODO: chưa check mimetype request về
 * @param {*} file 
 * @param {*} songId 
 */
const updateSongFile = async (musicFile, songId) => {
    if(musicFile){
        let path = await uploadFirebase(musicFile, folder.MUSIC);
        
        console.log("path = ", path);
        let file = {
            name: musicFile.originalname,
            encoding: musicFile.encoding,
            mimetype: musicFile.mimetype,
            size: musicFile.size,
            path: path
        }
        let song =  songDao.update(songId, {"file": file, "modifiedDate": Date.now()});
        if(!song)
            throw new CustomError(codes.NOT_FOUND, "not found!");
        
        return song;
    }
    else{
        throw new CustomError(codes.FILE_INVALID, "file is invalid, not match!");
    }
    
}

const deleteById = async (songId) => {
    await songDao.deleteById(songId);
}


/* ============ USER ============= */

/**
 * bên ngoài phải có middleware check token của user để xác định userId có hợp lệ không?
 * nếu user trả về là null thì là khách
 * @param {*} userId 
 * @param {*} songId 
 */
const watchSong = async (userId, songId) => {
    if(userId){
        let song = await Song.findById(songId);
        if (!song) {
            throw new CustomError(codes.NOT_FOUND, "not found!");
        }
        song.views += 1
        const history = await historyService.getHistory(userId)
        await song.save();
        
        if (!history) {
            await historyService.create(userId)
        } else {
            await historyService.saveToHistory(userId, song._id, song.type);
        }
        return song;
    }
    return await getById(songId);
}



module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateCoverImage,
    updateSongFile,

    /* USER */
    watchSong,


}

