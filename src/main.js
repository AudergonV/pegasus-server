global.VERSION = "0.1";
require('dotenv').config();
require('colors');
require('./utils/logger');
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
app.listen(port, () => {
    console.addlog(`Server listening on port ${port} :heavy_check_mark: `, 0);
});