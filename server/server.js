var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var localStrategy = require('./services/localStrategy.js');
var app = express();

var passport = require('passport');

var config = require('./config/config')[env];

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
