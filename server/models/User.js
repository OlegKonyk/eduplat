const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required!'},
  lastName: {type: String, required: '{PATH} is required!'},
  userName: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, colection) {
    if (err) {
      console.log(err);
    }
    if (colection.length === 0) {
      User.create({firstName: 'Oleg', lastName: 'Konyk', userName: 'oleg@oleg.com'});
      User.create({firstName: 'Vasa', lastName: 'Petrov', userName: 'vasa@vasa.com'});
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;
