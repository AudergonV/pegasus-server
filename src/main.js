global.VERSION = "0.1";
require('dotenv').config();
require('colors');
require('./utils/logger');
const db = require('./db/db');
const User = require('./obj/User');
const express = require('express');
const i18n = require('i18n');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Response = require('./obj/Response');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

i18n.configure({
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    directory: __dirname + '/locales',
    queryParameter: 'lang',
});

app.use(i18n.init);

app.use('/', require('./routes'));

app.use((req, res, next) => {
    new Response(404).send(res);
    next();
});

const port = process.argv[2] || 80;
app.listen(port, async () => {
    console.addlog(`Server listening on port ${port} :heavy_check_mark: `, 0);
    await db.openDB();
    let usercol = db.loadCollectionController('./usercol');
    await usercol.addUsers([new User("Test2")]);
    //await usercol.deleteUsers({username: "Test2"});
    //await usercol.deleteUsersById("5ebfdca50350b9c5146295b1");
    await usercol.updateUserById("5ebfdf222a666f61bc02de29", { $set: { username: "Oui" } });
    //await usercol.findUserById("5ebfdf222a666f61bc02de29");
    db.closeDB();
});