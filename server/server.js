var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./config/config')[env];

require('./config/express')(app, config);

require('./config/mongoose')(config);

app.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + config.port + '...');
  }
});
