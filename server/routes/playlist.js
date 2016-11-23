'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authHandlers');
const Playlist = require('../models/Playlist.js');

router.post('/personal', auth.jwt, createPlaylist);

router.get('/personal', auth.jwt, getPersonalPlaylists);

router.get('/featured', getFeaturedPlaylists);

router.get('/public', getPublicPlaylist);

function createPlaylist(req, res, next) {
  var playlistData = req.body;
  playlistData.ownerId = req.user._id;
  var newPlaylist = new Playlist(playlistData);
  newPlaylist.save()
    .then(function() {
      res.send('New playlist created: ' + playlistData.name).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
}

function getPersonalPlaylists(req, res, next) {
  Playlist.find({ownerId: req.user._id})
    .then(function(playlists) {
      res.json(playlists).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
}

function getFeaturedPlaylists(req, res, next) {
  Playlist.find({groups: 'public'})
    .then(function(playlists) {
      res.json(playlists).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
}

function getPublicPlaylist(req, res, next) {
  let id = req.query._id;
  Playlist.findById(id)
    .then(function(playlist) {
      res.json(playlist).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
}

module.exports = router;
