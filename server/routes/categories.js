'use strict';
const express = require('express');
const router = express.Router();
const categories = require('../routeControllers/categories');
const auth = require('../routeControllers/auth');

router.get('/all', categories.getAll);
router.get('/subcategories', categories.subcataegories);
router.post('/', auth.jwt, categories.create);

module.exports = router;
