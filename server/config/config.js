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

function getEnvironment(env) {
  let config;
  let evironments = {
    development: {
      db: 'mongodb://localhost/eduplat',
      rootPath: rootPath,
      port: process.env.PORT || 3030,
      APP_URL: 'http://localhost:3030/',
      FACEBOOK_SECRET: secrets.development.FACEBOOK_SECRET,
      GOOGLE_SECRET: secrets.development.GOOGLE_SECRET,
      EMAIL_SECRET: secrets.development.EMAIL_SECRET,
      SMTP_PASS: secrets.development.SMTP_PASS,
      MAILGUN_AUTH: secrets.development.MAILGUN_AUTH
    },
    production: {
      db: 'mongodb://localhost/eduplat',
      rootPath: rootPath,
      port: process.env.PORT || 80,
      APP_URL: 'http://localhost:3030/',
      FACEBOOK_SECRET: secrets.production.FACEBOOK_SECRET,
      GOOGLE_SECRET: secrets.production.GOOGLE_SECRET,
      EMAIL_SECRET: secrets.production.EMAIL_SECRET,
      SMTP_PASS: secrets.production.SMTP_PASS,
      MAILGUN_AUTH: secrets.production.MAILGUN_AUTH
    }
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
