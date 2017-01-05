'use strict';
const express = require('express');
const router = express.Router();
const emailVerification = require('../services/emailVerification');
const auth = require('../routeControllers/auth');
const googleAuth = require('../services/googleAuth');
const createSendToken = require('../services/jwt.js');

router.get('/verifyEmail', emailVerification.handler);

router.post('/google', googleAuth);

router.post('/register', auth.register, register);

router.post('/login', auth.login, login);

function register(req, res, next) {
  emailVerification.send(req, res);
  createSendToken(req.user, res);
}

function login(req, res, next) {
  createSendToken(req.user, res);
}

module.exports = router;
