'use strict';
var path = require('path');
var rootPath = path.resolve(__dirname, '../../');
var env = process.env.NODE_ENV;
var secrets = {development: {}, production: {}};
try {
  secrets = require('../../secrets.json');
} catch (err) {
  throw new Error('secrets.json is missing.');
}

function baseEnvironment(customConfig) {
  this.db = 'mongodb://localhost/eduplat';
  this.rootPath = rootPath;
  this.port = 3030;
  this.APP_URL = 'http://localhost:3030/';
  this.FACEBOOK_SECRET = secrets.development.FACEBOOK_SECRET;
  this.GOOGLE_SECRET = secrets.development.GOOGLE_SECRET;
  this.EMAIL_SECRET = secrets.development.EMAIL_SECRET;
  this.SMTP_PASS = secrets.development.SMTP_PASS;
  this.MAILGUN_AUTH = secrets.development.MAILGUN_AUTH;
  if (customConfig) {
    Object.assign(this, customConfig);
  }
}

function getEnvironment(env) {
  let config;
  let evironments = {
    development: new baseEnvironment(),
    docker: new baseEnvironment({
      db: 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/eduplat',
      port: 3030
    }),
    production: new baseEnvironment({
      db: 'mongodb://localhost/eduplat',
      port: 80
    })
  };
  if (evironments[env]) {
    console.log(`Running in ${env} mode.`);
    config = evironments[env];
  } else {
    console.log('Switched to development mode.');
    config = evironments.development;
  }

  return config;
}

module.exports = getEnvironment(env);
