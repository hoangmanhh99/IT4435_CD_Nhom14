const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    description: String,
    listSong: [],
    cover_image: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
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

var Topic = mongoose.model("Topic", schema);
module.exports = Topic;