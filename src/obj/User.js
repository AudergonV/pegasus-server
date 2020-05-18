module.exports = class User {

    /**
     * User constructor
     * @param {String} username The username
     */
    constructor(username, discordid, avatar, discriminator, fetchedAt, accessToken) {
        this.username = username;
        this.discordid = discordid;
        this.avatar = avatar;
        this.discriminator = discriminator;
        this.fetchedAt = fetchedAt;
        this.accessToken = accessToken;
        this.validate = false;
        this.role = 0;
    }

}