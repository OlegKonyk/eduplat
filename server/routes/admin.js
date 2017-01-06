'use strict';
const express = require('express');
const router = express.Router();
const googleSystem = require('../routeControllers/googleSystem');

router.post('/googleSystemUser', googleSystem.authorize);

router.get('/googleSystemUser', googleSystem.getToken);

router.delete('/googleSystemUser', googleSystem.unlink);

router.get('/googleSystemUser/status', googleSystem.getStatus);


module.exports = router;
