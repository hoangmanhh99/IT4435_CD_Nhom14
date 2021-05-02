const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        name: String,
        encoding: String,
        mimetype: String,
        size: Number,
        path: String
    },
    token: {
        type: String,
    },
    isVip: {
        type: Boolean,
        default: false
    },
    favoriteSingers: [{
        type: mongoose.Types.ObjectId,
        ref: "Singer"
    }],
    favoriteMVs: [{
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }],
    favoriteMAs: [{
        type: mongoose.Types.ObjectId,
        ref: "Song"
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
});

schema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token

    return userObject
}

var User = mongoose.model("User", schema);
module.exports = User;