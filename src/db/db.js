const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, { useUnifiedTopology: true });
let db;
const controllers = [];

/**
 * Open the connection to the mongodb
 */
const openDB = (callback) => {
    client.connect((err) => {
        if (err) {
            console.addlog(err.toString(), 2);
        }
        else {
            console.addlog(`MongoDB client connected to ${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, 3);
        }
        callback(err);
    });
};

const closeDB = () => {
    if (isOpen()) {
        client.close();
        console.addlog(`Connection to mongodb closed`, 3)
    }
    else {
        console.addlog(`The db client is already closed`, 1);
    }
};

/**
 * @returns If the db connection is open
 */
const isOpen = () => {
    return client.isConnected();
};

/**
 * 
 * @param {String} name the collection's name
 * @returns the collection or false
 */
const getCollection = (name) => {
    if (isOpen()) {
        db = client.db(process.env.DB_NAME);
        return db.collection(name);
    } else {
        console.addlog(`DB: Unabled to open the collection "${name}", client is closed.`, 2);
        return false;
    }
};

/**
 * 
 * @param {*} collection 
 * @param {*} data
 * @returns mongo's result object or undefined if error
 */
const insertMany = async (collection, data) => {
    let result;
    if (isOpen()) {
        await new Promise((resolve, reject) => {
            collection.insertMany(data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            console.addlog(err.toString(), 2);
        });
    } else {
        console.addlog(`The mongodb client is closed. Unabled to insert data.`, 1);
    }
    return result;
};

const deleteMany = async (collection, filter) => {
    let result;
    if (isOpen()) {
        await new Promise((resolve, reject) => {
            collection.deleteMany(filter, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            console.addlog(err.toString(), 2);
        });
    } else {
        console.addlog(`The mongodb client is closed. Unabled to delete data.`, 1);
    }
    return result;
};

const deleteById = async (collection, id) => {
    let result;
    if (isOpen()) {
        await new Promise((resolve, reject) => {
            collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            console.addlog(err.toString(), 2);
        });
    } else {
        console.addlog(`The mongodb client is closed. Unabled to delete data.`, 1);
    }
    return result;
};

const updateMany = async (collection, filter, data) => {
    let result;
    if (isOpen()) {
        await new Promise((resolve, reject) => {
            collection.updateMany(filter, data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            console.addlog(err.toString(), 2);
        });
    } else {
        console.addlog(`The mongodb client is closed. Unabled to update data.`, 1);
    }
    return result;
};

const updateById = async (collection, id, data) => {
    let result;
    let _id;
    try {
        _id = ObjectId(id);
    } catch (err) {
        console.addlog(`The id "${id}" is invalid`, 2);
    }
    if (_id) {
        if (isOpen()) {
            await new Promise((resolve, reject) => {
                collection.updateOne({ _id }, data, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            }).then((res) => {
                result = res;
            }).catch((err) => {
                console.addlog(err.toString(), 2);
            });
        } else {
            console.addlog(`The mongodb client is closed. Unabled to update data.`, 1);
        }
    }
    return result;
};

const find = async (collection, filter) => {
    let result;
    if (isOpen()) {
        await new Promise((resolve, reject) => {
            collection.find(filter).toArray((err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            console.addlog(err.toString(), 2);
        });
    } else {
        console.addlog(`The mongodb client is closed. Unabled to update data.`, 1);
    }
    return result;
};

const findById = async (collection, id) => {
    let result;
    let _id;
    try {
        _id = ObjectId(id);
    } catch (err) {
        console.addlog(`The id "${id}" is invalid`, 2);
    }
    if (_id) {
        if (isOpen()) {
            await new Promise((resolve, reject) => {
                collection.find({ _id }).toArray((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            }).then((res) => {
                result = res;
            }).catch((err) => {
                console.addlog(err.toString(), 2);
            });
        } else {
            console.addlog(`The mongodb client is closed. Unabled to find data.`, 1);
        }
    }
    return result;
};

const findOrCreate = async (collection, filter, obj) => {
    let result = undefined;
    await new Promise((resolve, reject) => {
        collection.findOneAndUpdate(
            filter,
            {
                $set: obj
            },
            { upsert: true, returnNewDocument: true, new: true},
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    }).then((res) => {
        result = res;
    }).catch(err => {
        console.addlog(`${err.toString()}`, 2);
    });
    return result;
};

/**
 * 
 * @param {String} name 
 * @returns the controller or undefined
 */
const loadCollectionController = (name) => {
    let controller;
    try {
        controller = require(`./ctrl/${name}`);
        controllers[name] = controller;
    } catch (error) {
        console.addlog(`Collection controller "${name}" doesn't exist.`);
    }
    return controller;
};

/**
 * 
 * @param {String} name
 * @returns The controller or undefined 
 */
const getController = (name) => {
    let controller = controllers[name];
    if (controller === undefined) {
        console.addlog(`Asked for db controller ${name}, but it doesn't exist'`, 2);
    }
    return controller;
};

module.exports = {
    openDB,
    closeDB,
    db,
    insertMany,
    deleteMany,
    deleteById,
    updateMany,
    updateById,
    getCollection,
    find,
    findById,
    findOrCreate,
    loadCollectionController,
    getController,
    isOpen
};