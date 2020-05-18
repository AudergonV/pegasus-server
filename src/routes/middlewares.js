const Response = require('../obj/Response');

const checkLoggedIn = (req,res,next) => {
    if (req.isAuthenticated()) {
        next();
    }else{
        new Response(403).send(res);    
    }
}

const checkAuth = (req,res,next) => {
    if (req.isAuthenticated() && req.user.validate) {
        next();
    }else{
        new Response(403).send(res);    
    }
};

const checkAdmin = (req,res,next) => {
    if (req.isAuthenticated() && req.user.validate && req.user.role === 1) {
        next();
    }else{
        new Response(403).send(res);    
    }
};

module.exports = { checkAuth, checkLoggedIn, checkAdmin };