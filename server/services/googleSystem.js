'use strict';
const google = require('googleapis');
const config = require('../config/config');
const OAuth2 = google.auth.OAuth2;

module.exports = function getGoogleToken(req, res, next) {


  var oauth2Client = new OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_SECRET,
    config.APP_URL // redirect url
  );

  var scopes = [
    'profile', 'email', 'https://gdata.youtube.com'
  ];

  var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as string
    scope: scopes
  });

  console.log('take it all!!!');
  res.send({url: url});
};
