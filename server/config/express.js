'use strict';
const routes = require('../routes/routes');
const playlist = require('../routes/playlist');
const admin = require('../routes/admin');
const auth = require('../routes/auth');
const categories = require('../routes/categories');
const users = require('../routes/users');

module.exports = function(app, config) {
  app.use('/api/playlist', playlist);
  app.use('/api/admin', admin);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/categories', categories);
  app.use('/', routes);
};
