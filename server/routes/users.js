'use strict';
const express = require('express');
const router = express.Router();
const users = require('../routeControllers/users');
const auth = require('../routeControllers/auth');

router.get('/current', auth.jwt, users.returnUser);

router.get('/all', auth.jwt, users.returnUsers);

module.exports = router;
