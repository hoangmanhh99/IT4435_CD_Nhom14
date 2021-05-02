const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    avatar: {
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
});

var Musican = mongoose.model("Musican", schema);
module.exports = Musican;