const _ = require('underscore');
const fs = require('fs');
const jwt = require('jwt-simple');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// var _config = require('./config.js');
var User = require('../models/User.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config')[env];
console.log(config.rootPath)
var model = {
  verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
  title: 'psJwt',
  subTitle: 'Thanks for signing up!',
  body: 'Please verify your email address by clicking the button below'
};

exports.send = function(req, res) {
  console.log(req.body)
  var email = req.body.email;
  var payload = {
    sub: email
  };

  var token = jwt.encode(payload, config.EMAIL_SECRET);

  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: 'postmaster@sandbox851651049ba14f918ab6661c998a1369.mailgun.org',
      pass: 'fbf2cbd90b524886b5b91d10a4ab5e9b'
    }
  });

  var mailOptions = {
    from: 'Accounts <learningmean@gmail.com>',
    to: email,
    subject: 'jwt Account verification',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function(err, info) {
    console.log("??????");
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
  var path = config.rootPath + '/server/views/emailVerification.html';
  //var path = '/Users/oleg/dev/eduplat/server/views/emailVerification.html';
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
