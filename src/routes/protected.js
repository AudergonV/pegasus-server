const {checkAuth} = require('./middlewares');
const Response = require('../obj/Response');

module.exports = app => {

    /**
     * GET /api/user/@me
     * @returns {User} The session's user
     */
    app.get('/api/users/@me', checkAuth, (req, res) => {
        new Response(200, req.user).send(res);
    });

}