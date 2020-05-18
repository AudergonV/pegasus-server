const {checkAdmin} = require('./middlewares');
const Response = require('../obj/Response');
const invitationctrl = require('../db/db').getController('invitation');

module.exports = app => {

    /**
     * POST /auth/invitation
     * Create a new Invitation
     */
    app.get('/auth/invitation', checkAdmin, async (req, res) => {
        let invitation = await invitationctrl.createInvitation();
        if (invitation){
            new Response(200, invitation.ops[0], `${process.env.BASE_URL}/auth/validate/${invitation.ops[0]._id}`).send(res);
        }else{
            new Response(500).send(res);
        }
    });

}