const {Types:{ObjectId}} = require('mongoose');

const {Moderator} = require('../models/index');


async function createModerator({email, name, password, roleId, role}){

    const moderator = await Moderator.create({email, name, password, roleId, role});
    return moderator;
}

async function findModerator(condition){
    if(ObjectId.isValid(condition)){
        const moderator = await Moderator.findById(condition);
        return moderator;
    }
    console.log("condition = ", typeof condition)
    if(condition != null && typeof condition === 'object'){
        const moderator = await Moderator.findOne(condition);
        console.log("moderator = ", moderator)
        return moderator;
    }

    return null;
}

async function updateModerator(moderatorId, data){
    const moderator = await Moderator.findByIdAndUpdate(moderatorId, data, {new: true});
    return moderator;

}

async function deleteModerator(moderatorId){
    await Moderator.findByIdAndDelete(moderatorId);
}

module.exports = {
    createModerator,
    findModerator,
    updateModerator,
    deleteModerator
}