const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = new Schema({
    name: String,
    cover_image: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
    },
    file: {
        name: String,
        path: String,
        mimetype: String,
        size: String,
        encoding: String,

    },
    type: {
        type: String,
        default: 'MA'
    },
    lyric: String,
    description: String,
    musican: {
        type: mongoose.Types.ObjectId,
        ref: "Musican"
    },
    categories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        }
    ],
    singers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Singer'
        }
    ],
    users_liked: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    shares: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    },

    createdDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:"Moderator"
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Moderator"
    }
});

var Song = mongoose.model("Song", schema);
module.exports = Song;