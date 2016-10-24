const _ = require('underscore');
const fs = require('fs');
const jwt = require('jwt-simple');
const nodemailer = require('nodemailer');

var User = require('../models/User.js');

var config = require('../config/config');

function Model() {
  return {
    verifyUrl: config.APP_URL + 'api/auth/verifyEmail?token=',
    title: 'EDUPLAT',
    subTitle: 'Thanks for signing up!',
    body: 'Please verify your email address by clicking the button below'
  };
}

exports.send = function(req, res) {
  var email = req.body.email;
  var payload = {
    sub: email
  };

  var token = jwt.encode(payload, config.EMAIL_SECRET);

  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: config.MAILGUN_AUTH
  });

  var mailOptions = {
    from: 'EDUPLAT <learningmean@gmail.com>',
    to: email,
    subject: 'EDUPLAT Account verification',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.status(500, err);
    }

    console.log('email sent ', info.response);
  });
};

exports.handler = function(req, res) {
  var token = req.query.token;
  var payload = jwt.decode(token, config.EMAIL_SECRET);
  var email = payload.sub;

  if (!email) return handleError(res);

  User.findOne({
    email: email
  }, function(err, foundUser) {
    if (err) return res.status(500);

    if (!foundUser) return handleError(res);

    if (!foundUser.active)
      foundUser.active = true;

    foundUser.save(function(err) {
      if (err) return res.status(500);

      return res.redirect(config.APP_URL);
    });
  });
};

function getHtml(token) {
  var model = new Model();
  var path = config.rootPath + '/server/views/emailVerification.html';
  var html = fs.readFileSync(path, encoding = 'utf8');

  var template = _.template(html);

  model.verifyUrl += token;

  return template(model);
}

function handleError(res) {
  return res.status(401).send({
    message: 'Authentication failed, unable to verify email'
  });
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
