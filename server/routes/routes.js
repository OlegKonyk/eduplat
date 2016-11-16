'use strict';
const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const emailVerification = require('../services/emailVerification');
const createSendToken = require('../services/jwt.js');
const config = require('../config/config');
const googleAuth = require('../services/googleAuth');
const auth = require('../controllers/authHandlers');
const User = require('../models/User.js');
const Playlist = require('../models/Playlist.js');

router.get('/api/auth/verifyEmail', emailVerification.handler);

router.post('/api/auth/google', googleAuth);

router.post('/api/register', auth.register, register);

router.post('/api/login', auth.login, login);

router.get('/api/user/', auth.jwt, returnUser);

router.post('/api/playlist', auth.jwt, function(req, res, next) {
  var playlistData = req.body;
  playlistData.ownerId = req.user._id;
  var newPlaylist = new Playlist(playlistData);
  newPlaylist.save()
    .then(function() {
      res.send('New playlist created: ' + playlistData.name).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
});

router.get('/api/playlist', auth.jwt, function(req, res, next) {
  Playlist.find({ownerId: req.user._id})
    .then(function(playlists) {
      res.json(playlists).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
});

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



module.exports = router;
