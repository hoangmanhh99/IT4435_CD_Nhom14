const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    week: String,
    description: String,
    type: String, // video, audio, album
    list: [
        {
            type: Object,
            default: null
        }
    ],
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

var BXH = mongoose.model("BXH", schema);
module.exports = BXH;