'use strict';
const google = require('googleapis');
const youtube = google.youtube('v3');
const config = require('../config/config');
const OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_SECRET,
  config.APP_URL// redirect url
);

// set auth as a global default
google.options({
  auth: oauth2Client
});

function authorize(req, res, next) {
  var scopes = [
    'profile', 'email', 'https://gdata.youtube.com'
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // gets refresh_token
    scope: scopes
  });

  res.send({url: url});
}

function getToken(req, res, next) {
  let code = req.query.code;
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (err) {
      res.status(500).send("not able to set google auth tokens");
    } else {
      oauth2Client.setCredentials(tokens);
      res.sendStatus(200);
    }
  });
}

function getStatus(req, res, next) {
  //console.log(new Date(oauth2Client.credentials.expiry_date).toLocaleTimeString());
  if (oauth2Client.credentials.access_token &&
      oauth2Client.credentials.expiry_date >= new Date().getTime()) {
    res.send({isAuth: true, expiryDate: oauth2Client.credentials.expiry_date});
  } else {
    res.send({isAuth: false});
  }
}

function unlink(req, res, next) {
  oauth2Client = new OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_SECRET,
    config.APP_URL// redirect url
  );
  res.sendStatus(200);
}

module.exports = {
  authorize,
  getToken,
  unlink,
  getStatus
};
