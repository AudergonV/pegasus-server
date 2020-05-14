const express = require('express');

const router = express.Router();

require('./routes/public')(router);
//require('./routes/admin')(router);
//require('./routes/auth')(router);
//require('./routes/files')(router);

module.exports = router;