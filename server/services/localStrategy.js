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
      return done(null, false, {
        message: 'Wrong email/password'
      });
    }

    user.comparePasswords(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) {
        return done(null, false, {
          message: 'Wrong email/password'
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
  let useData = req.body;
  User.findOne(searchUser, function(err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false, {
        message: 'user with this email already exists'
      });
    }

    var newUser = new User(useData);
    newUser.save(function(err) {
      if (err) console.log(err);
      done(null, newUser);
    });
  });
}

exports.register = new LocalStrategy(strategyOptions, register);
exports.login = new LocalStrategy(strategyOptions, login);
