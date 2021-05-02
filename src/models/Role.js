const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    permission: String
});

var Role = mongoose.model("Role", schema);
module.exports = Role;