const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = function(user, res) {
  console.log(user);
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, "shhh..");

  res.status(200).send({
    user: JSON.stringify(user),
    token: token
  });
};
