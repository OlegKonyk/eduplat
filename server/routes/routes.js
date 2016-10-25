'use strict';
const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const emailVerification = require('../services/emailVerification.js');
const createSendToken = require('../services/jwt.js');
const config = require('../config/config');

router.post('/api/register',
            passport.authenticate('local-register', {failWithError: true}),
            function(req, res) {
              emailVerification.send(req, res);
              createSendToken(req.body, res);
            },
            handleError);

router.get('/api/auth/verifyEmail', emailVerification.handler);

router.post('/api/login',
            passport.authenticate('local-login', {failWithError: true}),
            function(req, res) {
              createSendToken(req.user, res);
            },
            handleError);

router.get('/api/:name', function(req, res) {
  res.send(req.params.name);
});

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public/index.html'));
});

function handleError(err, req, res, next) {
  let message = req.customMessage || err.message;
  var output = {
    name: err.name,
    message: message,
    text: err.toString()
  };
  var statusCode = err.status || 500;
  res.status(statusCode).json(output);
}

module.exports = router;
