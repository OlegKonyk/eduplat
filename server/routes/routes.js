'use strict';
const express = require('express');
const path = require('path');
const router = express.Router();
const emailVerification = require('../services/emailVerification');
const createSendToken = require('../services/jwt.js');
const config = require('../config/config');
const googleAuth = require('../services/googleAuth');
const googleSystem = require('../services/googleSystem');
const auth = require('../controllers/authHandlers');
const User = require('../models/User.js');

router.get('/api/auth/verifyEmail', emailVerification.handler);

router.post('/api/auth/google', googleAuth);

router.post('/api/auth/googleSystemUser', googleSystem.authorize);

router.get('/api/auth/googleSystemUser', googleSystem.getToken);

router.post('/api/register', auth.register, register);

router.post('/api/login', auth.login, login);

router.get('/api/user/', auth.jwt, returnUser);

router.get('/api/users/', auth.jwt, returnUsers);

router.get('/front/*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public', req.params[0]));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(config.rootPath, 'public/index.html'));
});

function register(req, res, next) {
  emailVerification.send(req, res);
  createSendToken(req.user, res);
}

function login(req, res, next) {
  createSendToken(req.user, res);
}

function returnUser(req, res, next) {
  let id = req.query._id;
  User.findById(id).exec()
  .then(function(user) {
    res.json(user.toJSON()).status(200);
  });
}

function returnUsers(req, res, next) {
  User.find({}).exec()
    .then(function(users) {
      res.json(users).status(200);
    });
}

module.exports = router;
