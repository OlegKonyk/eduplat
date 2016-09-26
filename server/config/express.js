var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var routes = require('../routes/routes');

module.exports = function(app, config) {
  app.use(logger('dev'));

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(session({secret: 'multivision unicorns',
                   resave: false,
                   saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(config.rootPath, 'public/app')));

  app.use('/', routes);
};
