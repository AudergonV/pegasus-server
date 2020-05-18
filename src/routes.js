const express = require('express');

const router = express.Router();

require('./routes/public')(router);
require('./routes/protected')(router);
require('./routes/admin')(router);
require('./routes/auth')(router);

module.exports = router;