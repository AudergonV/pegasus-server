const Response = require('../obj/Response');

const checkAuth = (req,res,next) => {
    if (req.isAuthenticated()) {
        next();
    }else{
        new Response(403).send(res);    
    }
};

module.exports = { checkAuth };