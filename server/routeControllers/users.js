'use strict';
const User = require('../models/User.js');

function returnUser(req, res, next) {
  let id = req.query._id;
  User.findById(id).exec()
  .then(function(user) {
    res.json(user.toJSON()).status(200);
  });
}

function returnUsers(req, res, next) {
  User.find({}).exec()
    .then(function(users) {
      res.json(users).status(200);
    });
}

module.exports = {returnUser, returnUsers};
