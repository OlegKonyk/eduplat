'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = function(user, res) {
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix() * 1000
  };

  var token = jwt.encode(payload, "shhh..");

  res.status(200).send({
    user: user,
    token: token
  });
};
