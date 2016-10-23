var path = require('path');
var rootPath = path.resolve(__dirname, '../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/eduplat',
    rootPath: rootPath,
    port: process.env.PORT || 3030,
    FACEBOOK_SECRET: '',
    GOOGLE_SECRET: '',
    EMAIL_SECRET: '',
    SMTP_PASS: '',
    APP_URL: ''
  },
  production: {
    db: 'mongodb://localhost/eduplat',
    rootPath: rootPath,
    port: process.env.PORT || 80,
    FACEBOOK_SECRET: '',
    GOOGLE_SECRET: '',
    EMAIL_SECRET: '',
    SMTP_PASS: '',
    APP_URL: ''
  }
};
