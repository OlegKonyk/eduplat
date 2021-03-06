const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User.js');

var opts = {
  passReqToCallback: true
};
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = "shhh..";

module.exports = new JwtStrategy(opts, function(req, payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false, 'user is not found');
    }
  });
});

