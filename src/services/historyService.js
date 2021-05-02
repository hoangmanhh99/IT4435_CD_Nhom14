const historyDao = require('../daos/historyDao');
const {MUSIC_TYPE} = require('../constants/index');
const create = async (userId) => {
    return await historyDao.create({userId});
}


const getHistory = async (userId) => {
    let history = await historyDao.getHistory(userId);
    return history;
}

const deleteHistory = async (userId) => {
    let history = await historyDao.update({userId, musicVideos: [], musicAudios: [], playlists: []}, userId);
    return history;
}

/**
 * 
 * @param {*} userId 
 * @param {*} songId 
 * @param {music type} type 
 */
const saveToHistory = async (userId, songId, type) => {
    let history = await historyDao.getHistory(userId);
    switch(type){
        case MUSIC_TYPE.MV:
            return await updateMVsHistoryList(userId, songId, history);
            
        case MUSIC_TYPE.MA:
            return await updateMAsHistoryList(userId, songId, history);
    }
    
}

/**
 * cập nhật danh sách Music video đã xem của user
 * @param {*} userId 
 * @param {*} songId 
 * @param {*} history 
 */
const updateMVsHistoryList = async (userId, songId, history) => {
    let {musicVideos} = history;

    if(musicVideos.length > 0){
        for(let i = musicVideos.length - 1; i >= 0; i--){
            if(musicVideos[i].toString() == songId.toString()){
                musicVideos.splice(i, 1);
                musicVideos.push(songId);
                break;
            }
            if(i == 0 && musicVideos[i] != songId){
                musicVideos.push(songId);
                break;
            }
        }
    }
    else{
        musicVideos.push(songId);
    }
    return await historyDao.update({musicVideos}, userId);
}

/**
 * cập nhật danh sách đã xem Music audio của user
 * @param {*} userId 
 * @param {*} songId 
 * @param {*} history 
 */
const updateMAsHistoryList = async (userId, songId, history) => {
    let {musicAudios} = history;
    if(musicAudios.length > 0){
        for(let i = musicAudios.length - 1; i >= 0; i--){
            if(musicAudios[i].toString() == songId.toString()){
                musicAudios.splice(i, 1);
                musicAudios.push(songId);
                break;
            }
            if(i == 0 && musicAudios[i] != songId){
                musicAudios.push(songId);
                break;
            }
        }
    }
    else
        musicAudios.push(songId);
    
    return await historyDao.update({musicAudios}, userId);
}

module.exports = {
    saveToHistory,
    create,
    getHistory,
    deleteHistory

}