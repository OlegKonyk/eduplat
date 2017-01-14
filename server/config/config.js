'use strict';
var path = require('path');
var rootPath = path.resolve(__dirname, '../../');
var env = process.env.NODE_ENV;
var secrets = {development: {}, production: {}};
try {
  secrets = require('../../sec/secrets.json');
} catch (err) {
  throw new Error('secrets.json is missing.');
}

function baseEnvironment(customConfig) {
  this.db = 'mongodb://localhost/eduplat';
  this.rootPath = rootPath;
  this.port = 3030;
  this.APP_URL = 'http://localhost:3030';
  this.GOOGLE_CLIENT_ID = '180115616906-3dekl0d823bbm280f1hidk1kk41cd9fl.apps.googleusercontent.com';
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
      db: 'mongodb://admin:123@ds159988.mlab.com:59988/staging',
      port: 3030,
      APP_URL: 'http://okonyk.com:3030'
    }),
    production: new baseEnvironment({
      db: 'mongodb://admin:123@ds159988.mlab.com:59988/staging',
      port: 80,
      APP_URL: 'http://coursespin.com'
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
