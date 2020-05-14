const fs = require('fs');
const moment = require('moment');
const Log = require('../obj/Log');
const Response = require('../obj/Response');


console["addlog"] = (message, type = 0) => {
    let log = new Log(message, type);
    fs.appendFile(`${process.env.LOG_DIRECTORY}/logs-${moment().format('DD-MM-YYYY')}.log`, log.toString() + "\n", function (err) {
        if (err) throw err;
    });
    return log;
};


/**
 * Fetch the daily logs stored in the .log file. Returns a Response object
 * @param {function} callback the callback function
 */
const getLastLogs = function (callback) {
    fs.readFile(`${process.env.LOG_DIRECTORY}/logs-${moment().format('DD-MM-YYYY')}.log`, "utf8", (err, data) => {
        let logs = [];
        for (let log of data.split('\n')) {
            let type = 0;
            if (log.indexOf('[WARNING]') >= 0) type = 1;
            if (log.indexOf('[ERROR]') >= 0) type = 2;
            if (log.indexOf('[SUCCESS]') >= 0) type = 3;
            logs.push({ message: log, type: type });
        }
        callback(new Response(200, logs));
    });
}



module.exports = { getLastLogs };