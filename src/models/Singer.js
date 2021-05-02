const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const SingerSchema = new Schema({
    name: String,
    gender: String,
    age: {
        type: Number,
        default: 0
    },
    avatar: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
    },
    description: String,

    favorites: {
        type: Number,
        default: 0
    },
    users_liked: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
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

var Singer = mongoose.model("Singer", SingerSchema);
module.exports = Singer;