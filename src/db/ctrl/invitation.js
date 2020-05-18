const db = require('../db');
const collection = db.getCollection('invitations');
const Invitation = require('../../obj/Invitation');
const moment = require('moment');

const createInvitation = async () => {
    let result = await db.insertMany(collection, [new Invitation()]);
    if (result) {
        console.addlog(`${result.insertedCount} invitation(s) have been created`);
    } else {
        console.addlog(`An error occurred while creating invitations`, 2);
    }
    return result;
};

const checkAndUseCode = async (code) => {
    let invitation = (await db.findById(collection, code));
    let ok = false;
    if (invitation && invitation[0]) {
        console.log(moment(invitation[0].expiresAt).isAfter(moment()));
        ok = (await db.deleteById(collection, code)).deletedCount > 0 && moment(invitation[0].expiresAt).isAfter(moment())
    }
    return ok;
}

const deleteExpiredInvitations = async () => {
    //TODO
    return false;
}


module.exports = { createInvitation, checkAndUseCode, deleteExpiredInvitations };