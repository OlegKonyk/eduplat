var express = require('express');
var path = require('path');

var routes = require('../routes/routes');

module.exports = function(app, config) {
  app.use(express.static(path.join(config.rootPath, 'public/app')));
  app.use('/', routes);
};
