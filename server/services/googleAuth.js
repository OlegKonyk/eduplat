var config = require('../config/config');
var request = require('request');
var createSendToken = require('./jwt');
var User = require('../models/User.js');

module.exports = function(req, res, next) {

  var url = 'https://accounts.google.com/o/oauth2/token';
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: config.GOOGLE_SECRET
  };

  request.post(url, {
    json: true,
    form: params
  }, function(err, response, token) {
    if (err) return next(err);
    if (response.statusCode !== 200) return res.status(response.statusCode);

    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };

    request.get({
      url: 'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
      headers: headers,
      json: true
    }, function(err, response, profile) {
      if (err) return next(err);
      if (response.statusCode !== 200) return res.status(response.statusCode);
      console.log("========");
      console.log(JSON.stringify(response.body));
    });

    request.get({
      url: apiUrl,
      headers: headers,
      json: true
    }, function(err, response, profile) {
      if (err) return next(err);
      if (response.statusCode !== 200) return res.status(response.statusCode);
      User.findOne({
        googleId: profile.sub
      }, function(err, foundUser) {
        if (foundUser) return createSendToken(foundUser, res);
        var newUser = new User({
          googleId: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email
        });
        newUser.save(function(err) {
          if (err) return next(err);
          createSendToken(newUser, res);
        });
      }); // findOne
    }); // end get
  });
};
