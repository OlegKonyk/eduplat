'use strict';
const User = require('../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const strategyOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

function login(req, email, password, done) {
  console.log("|||||||||");
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

/*exports.tokenAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

/* exports.requiresRole = function(role){
	return function(req, res, next){
		if(req, res, next){
			if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
				res.status(403);
				res.end();
			}else{
				next();
			}
		}
	}
}*/
