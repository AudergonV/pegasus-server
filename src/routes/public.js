//const authMiddleware = require('./middlewares').authMiddleware;
const Response = require('../obj/Response');
const i18n = require('i18n');

module.exports = app => {

    /**
     * GET /version
     * @returns {String} the server version
     */
    app.get('/api/version', (req, res) => {
        new Response(200, { version: `${res.__('VERSION')}${global.VERSION}` }).send(res);
    });

}