const { checkAuth } = require('./middlewares');
const Response = require('../obj/Response');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const userctrl = require('../db/db').getController('user');
const User = require('../obj/User');
const secret = require('../../secret_config');
const scopes = ['identify', 'email'];

passport.use(new DiscordStrategy({
    clientID: secret.DISCORD_ID,
    clientSecret: secret.DISCORD_SECRET,
    callbackURL: 'http://localhost/auth/callback',
    scope: scopes

},
    async (accessToken, refreshToken, profile, done) => {
        let result = await userctrl.findOrCreateUser(new User(profile.username, profile.id, profile.avatar, profile.discriminator, profile.fetchedAt, accessToken));
        if (result && result.value) {
            done(null, result.value);
        }
        else {
            done(`INTERNAL SERVER ERROR`);
        }
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = app => {

    /**
     * GET /auth/login
     */
    app.get('/auth/login', passport.authenticate('discord'));

    /**
     * GET /auth/callback
     */
    app.get('/auth/callback', passport.authenticate('discord', { successRedirect: '/auth/success' }), (err, req, res, next) => {
        if (err) {
            console.addlog(err.toString(), 2);
            new Response(500).send(res);
        }
        else { res.redirect('/auth/success'); }
    });

    app.get('/auth/success', checkAuth, (req, res) => {
        new Response(200, undefined, `${res.__('LOGIN_SUCCESSFUL')}${req.user.username}#${req.user.discriminator}`).send(res);
    });

    /**
     * GET /auth/failure
     */
    app.get('/auth/failure', (req, res) => {
        new Response(400, undefined, res.__('INVALID_CODE')).send(res);
    });

    app.get('/auth/logout', (req, res) => {
        req.logout();
        new Response(200, undefined, res.__('LOGOUT')).send(res);
    });
}