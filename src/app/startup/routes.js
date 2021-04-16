const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const authenticator = require('../../authenticator');
//const returns = require('../routes/returns');
//const error = require('../middleware/error');

module.exports = function (app) {
  //app.use(helmet());
  app.use(express.json());
  app.use('/api/genres', genres.default);
  app.use('/api/customers', customers.default);
  app.use('/api/movies', movies.default);
  //  app.use('/api/rentals', rentals);
  app.use('/api/users', users.default);
  app.use('/api/auth', auth.default);
  app.use(authenticator);
  //  app.use(logger);
  //app.use('/api/returns', returns);
  //app.use(error);
};
