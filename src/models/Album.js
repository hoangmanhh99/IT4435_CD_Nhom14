const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    description: String,
    cover_image: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
    },
    musicList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song"
        }
    ],
    category: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Category"
        }
    ],
    singers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Singer"
        }
    ],
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
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
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

var Album = mongoose.model("Album", schema);
module.exports = Album;