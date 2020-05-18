const moment = require('moment');
const emoji = require('node-emoji');

module.exports = class Log {

    /**
     * Log constructor
     * @param {Number} message The log type (0 = Info, 1 = Warning, 2 = Error, 3 = Success)
     * @param {String} type The log message
     */
    constructor(message, type) {
        this.type = type;
        this.message = message;
        this.date = new Date();
        this.show();
    }

    show() {
        switch (this.type) {
            case 0:
                console.log(`${this.toString()}`)
                break;
            case 1:
                console.log(`${this.toString()}`.yellow)
                break;
            case 2:
                console.log(`${this.toString()}`.red)
                break;
            case 3:
                console.log(`${this.toString()}`.green)
                break;
            case 4:
                console.log(`${this.toString()}`.cyan)
                break;
        }
    }

    toString() {
        let type_text = "";
        switch (this.type) {
            case 0:
                type_text = "[INFO]";
                break;
            case 1:
                type_text = "[WARNING]";
                break;
            case 2:
                type_text = "[ERROR]";
                break;
            case 3:
                type_text = "[SUCCESS]";
                break;
            case 4:
                type_text = "[SYSTEM]";
                break;
        }
        return `[${moment(this.date).format('DD/MM/YYYY HH:mm:ss')}]${type_text} ${emoji.emojify(this.message)}`;
    }
}
