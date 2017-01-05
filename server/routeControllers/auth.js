'use strict';
const passport = require('passport');

function jwt(req, res, next) {
  passport.authenticate('jwt-startegy', function(err, user, info) {
    resHandler(req, res, next, err, user, info);
  })(req, res, next);
}

function login(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    resHandler(req, res, next, err, user, info);
  })(req, res, next);
}

function register(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    resHandler(req, res, next, err, user, info);
  })(req, res, next);
}

function resHandler(req, res, next, err, user, info) {
  if (err) { return next(err); }
  if (!user) { return res.status(401).json(info.message); }
  req.user = user;
  next();
}

module.exports = {login, register, jwt};
