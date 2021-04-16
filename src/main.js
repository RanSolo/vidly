const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();
require('./app/startup/cors')(app);

require('./app/startup/logging')();

require('./app/startup/routes')(app);
require('./app/startup/db')();
require('./app/startup/config')();
require('./app/startup/validation')();

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
