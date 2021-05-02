const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    expireDate: Date,
    startDate: Date,
    periodRemained: Number, 
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
});

var Purchase = mongoose.model("Purchase", schema);
module.exports = Purchase;