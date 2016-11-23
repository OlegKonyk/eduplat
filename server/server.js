'use strict';
var fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const localStrategy = require('./services/localStrategy.js');
const jwtStrategy = require('./services/jwtStrategy.js');

let credentials;

try {
  let privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
  let certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
  credentials = {key: privateKey, cert: certificate};
} catch (err) {
  console.error("ssl sertificate missing");
}


const app = express();

const passport = require('passport');

const config = require('./config/config');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);
passport.use('jwt-startegy', jwtStrategy);

require('./config/express')(app, config);

require('./config/mongoose')(config);

var httpServer = http.createServer(app);

httpServer.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + config.port + '...');
  }
});

if (credentials) {
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Listening on port ' + 8443 + '...');
    }
  });
}

