var express = require('express');
var path = require('path');
var router = express.Router();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config')[env];

router.get('/api/:name', function(req, res) {
  res.send(req.params.name);
});

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, './public/app/index.html'));
});

module.exports = router;
