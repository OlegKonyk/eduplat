'use strict';
const express = require('express');
const path = require('path');
const router = express.Router();
const config = require('../config/config');

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public/index.html'));
});

module.exports = router;
