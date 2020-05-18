global.VERSION = "0.1";
require('dotenv').config();
require('colors');
require('./utils/logger');
const db = require('./db/db');
const express = require('express');
const session = require('express-session');
const i18n = require('i18n');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Response = require('./obj/Response');
const passport = require('passport');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

i18n.configure({
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    directory: __dirname + '/locales',
    queryParameter: 'lang',
});

app.use(i18n.init);

console.addlog(`Starting Pegasus Server V${global.VERSION}`, 4);

process.on('exit', function () {
    if (db.isOpen()) db.closeDB();
    console.addlog('Pegasus Server Closed', 4);
});

db.openDB(err => {
    if (err) {
        console.addlog(`FATAL ERROR: DB Unreachable, exiting...`, 2);
        process.exit(1);
    } else {
        db.loadCollectionController('user');
        let i = db.loadCollectionController('invitation');
        app.use('/', require('./routes'));
        app.use((req, res, next) => {
            new Response(404).send(res);
            next();
        });
        const port = process.argv[2] || 80;
        app.listen(port, async () => {
            console.addlog(`Server listening on port ${port} :heavy_check_mark: `, 0);
            i.createInvitation();
        });
    }
});
