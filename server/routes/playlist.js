'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

const auth = require('../controllers/authHandlers');
const Playlist = require('../models/Playlist.js');

router.post('/personal', auth.jwt, createPlaylist);

router.post('/upload', auth.jwt, multipartyMiddleware, function(req, res) {
  // We are able to access req.files.file thanks to 
  // the multiparty middleware
  var file = req.files.file;
  var data = req.body.data;
  // console.log(file, data);
  // console.log(file.type);
  var fileData = fs.readFileSync(file.path);
  console.log(fileData);

  var playlistData = req.body.data;
  playlistData.ownerId = req.user._id;
  playlistData.thumbnail = fileData.toString('base64');
  var newPlaylist = new Playlist(playlistData);
  newPlaylist.save()
    .then(function() {
      res.send('New playlist created: ' + playlistData.name).status(200);
    }, function(err) {
      res.send(err.message).status(500);
    });
});

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
