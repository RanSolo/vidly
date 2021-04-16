//const config = require('config');
//const debug = require('debug')('app:startup');
//const morgan = require('morgan');
//const helmet = require('helmet');
//const express = require('express');
//const app = express();
//const genres = require('./app/routes/genres');
//const customers = require('./app/routes/customers');
//const movies = require('./app/routes/movies');
//const rentals = require('./app/routes/rentals');
//const users = require('./app/routes/users');
//const auth = require('./app/routes/auth');
//const home = require('./app/routes/home');
//const logger = require('./app/middleware/logger');
//const cors = require('cors');
//require('./app/startup/db').default();
//const authenticator = require('./authenticator');
//const mongoose = require('mongoose');
//const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
//if (!config.get('jwtPrivateKey')) {
//  console.error('FATAL ERROR: No jwtPrivateKey');
//  process.exit(1);
//}

//mongoose
//  .connect('mongodb://localhost/vidly', {
//    useCreateIndex: true,
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    useFindAndModify: false
//  })
//  .then(() => console.log('Connected to MongoDB...'))
//  .catch((err) => console.error('Could not connect to MongoDB...', err));

////configuration

//app.set('views', './views');

//console.log('Application Name: ' + config.get('name'));
//console.log('Mail: ' + config.get('mail.host'));
//console.log('Password: ', config.get('mail.password'));

//// middleware
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

//if (app.get('env') === 'development') {
//  app.use(morgan('tiny'));
//  debug('Morgan enabled');
//}

//app.use(cors());
//app.use(helmet());
//app.use('/api/genres', genres.default);
//app.use('/api/customers', customers.default);
//app.use('/api/movies', movies.default);
//app.use('/api/rentals', rentals.default);
//app.use('/api/users', users.default);
//app.use('/api/auth', auth.default);
//app.use('/', home.default);
//app.use(logger);
//app.use(authenticator);

//port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`listening on port ${port}...`));
