global.VERSION = "0.1";
const express = require('express');
const i18n = require('i18n');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
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
    res.status(404).send('Erreur 404');
    next();
});

const port = process.argv[2] || 80;
app.listen(port, () => {

});