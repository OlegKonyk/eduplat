const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const emailVerification = require('../services/emailVerification.js');
const createSendToken = require('../services/jwt.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config')[env];

router.post('/api/register',
            passport.authenticate('local-register'),
            function(req, res) {
              console.log("^^^^^^");
              console.log(req.body);
              console.log("------");
              emailVerification.send(req, res);
              createSendToken(req.body, res);
            });

router.get('/api/auth/verifyEmail', emailVerification.handler);

router.get('/api/:name', function(req, res) {
  res.send(req.params.name);
});

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public/index.html'));
});

module.exports = router;
