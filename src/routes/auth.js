const auth = require('../auth/authenticator');
const SECRET_CONFIG = require('../../secret_config.json');
const jwt = require("jsonwebtoken");
const Response = require('../obj/Response');

module.exports = app => {

    /**
     * POST /api/login
     * Permet de vérifier les informations de connexion.
     * Si les infos sont correctes retourne un token d'authentification
     */
    app.post('/api/login', (req, res) => {
        let { username, password } = req.body;
        if (username && password) {
            auth.verifyPassword(username, password, async user => {
                if (user) {
                    await new Promise((resolve, reject) => {
                        jwt.sign({ user }, SECRET_CONFIG.SECRET_KEY, (err, token) => {
                            resolve(token, err)
                        });
                    }).then((token, err) => {
                        if (err) {
                            new Response(500, undefined).send(res);
                        } else {
                            new Response(200, {token, admin: user.admin}, `Bienvenue ${user.prenom}`).send(res);
                            console.addlog(`Connexion de ${user.nom} ${user.prenom}`);
                        }
                    });
                } else {
                    new Response(401, undefined, "Mot de passe ou nom d'utilisateur incorrect").send(res);
                }
            });
        } else {
            new Response(401, undefined, "Mot de passe ou nom d'utilisateur incorrect").send(res);
        }
    });
}