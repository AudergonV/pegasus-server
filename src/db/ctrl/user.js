const db = require('../db');
const collection = db.getCollection('users');

const addUsers = async (users) => {
    let result = await db.insertMany(collection, users);
    if (result) {
        console.addlog(`${result.insertedCount} user(s) have been inserted`);
    } else {
        console.addlog(`An error occurred while deleting users`, 2);
    }
    return result;
};

const deleteUsers = async (filter) => {
    let result = await db.deleteMany(collection, filter);
    if (result) {
        console.addlog(`${result.deletedCount} user(s) have been deleted`);
    } else {
        console.addlog(`An error occurred while deleting users`, 2);
    }
    return result;
};

const deleteUsersById = async (id) => {
    let result = await db.deleteById(collection, id);
    if (result) {
        console.addlog(`${result.deletedCount} user(s) have been deleted`);
    } else {
        console.addlog(`An error occurred while deleting users`, 2);
    }
    return result;
};

const updateUsers = async (filter, data) => {
    let result = await db.updateMany(collection, filter, data);
    if (result) {
        console.addlog(`${result.modifiedCount} user(s) have been updated`);
    } else {
        console.addlog(`An error occurred while updating users`, 2);
    }
    return result;
};

const updateUserById = async (id, data) => {
    let result = await db.updateById(collection, id, data);
    if (result) {
        console.addlog(`${result.modifiedCount} user(s) have been updated`);
    } else {
        console.addlog(`An error occurred while updating users`, 2);
    }
    return result;
};

const findUser = async (filter) => {
    let result = await db.find(collection, filter);
    if (result) {
        console.addlog(`${result.length} user(s) found`);
    } else {
        console.addlog(`An error occurred while searching users`);
    }
    return result;
}

const findUserById = async (id) => {
    let result = await db.findById(collection, id);
    if (result) {
        console.addlog(`${result.length} user(s) found`);
    } else {
        console.addlog(`An error occurred while searching users`, 2);
    }
    return result;
};

const findOrCreateUser = async (user) => {
    let result = await db.findOrCreate(collection, { discordid: user.discordid }, user);
    if (result) {
        console.addlog(result.ok === 1 ? `User created or updated` : `Failed to create or update user`, result.ok === 1 ? 0 : 2);
    } else {
        console.addlog(`An error occurred while creating a user`, 2);
    }
    return result;
};

module.exports = { addUsers, deleteUsers, deleteUsersById, updateUsers, findUser, findUserById, findOrCreateUser, updateUserById };