'use strict';
const User = require('../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const strategyOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

function login(req, email, password, done) {
  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) return done(err);

    if (!user) {
      req.customMessage = 'Wrong email/password';
      return done(null, false, {
        message: req.customMessage
      });
    }

    user.comparePasswords(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) {
        req.customMessage = 'Wrong email/password';
        return done(null, false, {
          message: req.customMessage
        });
      }
      return done(null, user);
    });
  });
}

function register(req, email, password, done) {
  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      req.customMessage = 'user with this email already exists';
      return done(null, false, {
        message: req.customMessage
      });
    }

    var newUser = new User({
      email: email,
      password: password
    });
    newUser.save(function(err) {
      if (err) console.log(err);
      done(null, newUser);
    });
  });
}

exports.register = new LocalStrategy(strategyOptions, register);
exports.login = new LocalStrategy(strategyOptions, login);
