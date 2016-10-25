'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const localStrategy = require('./services/localStrategy.js');
const app = express();

const passport = require('passport');

const config = require('./config/config');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

require('./config/express')(app, config);

require('./config/mongoose')(config);

app.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + config.port + '...');
  }
});
