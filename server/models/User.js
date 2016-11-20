'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  active: Boolean,
  roles: [String],
  groups: [String],
  owner: [String]
});

UserSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.createDefaultUsers = function() {
  this.find({}).exec()
  .then(colection => {
    if (colection.length === 0) {
      this.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'foo@bar.com',
        password: 'admin',
        roles: ['admin']}
      );
    }
  }, err => {
    console.log(err);
  });
};

module.exports = mongoose.model('User', UserSchema);
