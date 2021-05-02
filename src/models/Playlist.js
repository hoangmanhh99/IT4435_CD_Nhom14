const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    listSong: [{
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }],
    description: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }

});

var Playlist = mongoose.model("Playlist", schema);
module.exports = Playlist;