const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const schema = new Schema({
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    musicVideos: [{
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }],
    musicAudios: [{
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }],         
    playlists: [{
        type: mongoose.Types.ObjectId,
        ref: "Playlist"
    }]
});

var History = mongoose.model("History", schema);
module.exports = History;