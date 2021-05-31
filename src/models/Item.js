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
    price: {
        type: Number,
        default: 0
    },
    mountOfDay: {
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
        ref: "Moderator"
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Moderator"
    }
});

var Item = mongoose.model("Item", schema);
module.exports = Item;