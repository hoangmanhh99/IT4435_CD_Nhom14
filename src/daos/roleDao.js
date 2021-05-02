const Role = require('../models/Role');

const createRole = async ({ name, permission }) => {
    const role = await Role.create({ name, permission });
    return role;
}

const findRole = async (name) => {
    const role = await Role.findOne({ name });
    return role;
}

module.exports = {
    createRole,
    findRole,

}