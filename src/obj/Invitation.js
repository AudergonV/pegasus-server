const moment = require('moment');

module.exports = class Invitation {

    constructor(){
        this.creationdate = moment().toDate();
        this.expiresAt = moment().add(1,'hour').toDate();
    }

}