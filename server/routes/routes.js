'use strict';
const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const emailVerification = require('../services/emailVerification');
const createSendToken = require('../services/jwt.js');
const config = require('../config/config');
const googleAuth = require('../services/googleAuth');
const User = require('../models/User.js');

router.post('/api/register', handleSignup);

router.get('/api/auth/verifyEmail', emailVerification.handler);

router.post('/api/login', handleSignin);

router.post('/api/auth/google', googleAuth);

router.get('/api/user/', passport.authenticate('jwt-startegy'), function(req, res, next) {
  let id = req.query._id;
  User.findById(id).exec()
    .then(function(user) {
      console.log(user);
      res.json(user).status(200);
    });
});

router.get('/api/:name', function(req, res) {
  res.send(req.params.name);
});

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public/index.html'));
});

function handleSignin(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(403).json(info); }
    createSendToken(user, res);
  })(req, res, next);
}

function handleSignup(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(403).json(info); }
    emailVerification.send(req, res);
    createSendToken(user, res);
  })(req, res, next);
}

module.exports = router;
