const emoji = require('node-emoji');

/**
 * @class Response
 * @description Response object
 */
module.exports = class Response {

    /**
     * Response's constructor
     * @param {Number} code HTTP CODE 
     * @param {Object} data Returned json object
     * @param {String} message Message (Optional)
     */
    constructor(code, data, message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    send(res) {
        //If message is undefined, the default HTTP response is returned
        if (!this.message) this.message = res.__(`HTTP_${this.code}`);
        if (this.message) this.message = emoji.emojify(this.message);
        res.status(this.code).send(this);
    };

}
