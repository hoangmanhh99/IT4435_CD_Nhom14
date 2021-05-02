const {Types:{ObjectId}} = require('mongoose');

const User = require('../models/User');


async function createUser({email, name, password}){
    const user = await User.create({email, name, password});
    return user;
}

async function findUser(condition){
    if(ObjectId.isValid(condition)){
        const user = await User.findById(condition);
        return user;
    }
    if(condition != null && typeof condition === 'object'){
        const user = await User.findOne(condition);
        return user;
    }
    return null;
}

async function updateUser(userId, data){
    const user = await User.findByIdAndUpdate(userId, data, {new: true});
    return user;

}

async function deleteUser(userId){
    await User.findByIdAndDelete(userId);
}

module.exports = {
    createUser,
    findUser,
    updateUser,
    deleteUser
}