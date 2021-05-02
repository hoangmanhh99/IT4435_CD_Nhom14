const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const SingerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
    },
    gender: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: ["employee", "manager"]
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    }
});

var Moderator = mongoose.model("Moderator", SingerSchema);
module.exports = Moderator;