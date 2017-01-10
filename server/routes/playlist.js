'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

const auth = require('../routeControllers/auth');
const Playlist = require('../models/Playlist.js');

const google = require('googleapis');
const youtube = google.youtube('v3');

router.post('/personal', auth.jwt, createPlaylist);

router.delete('/personal', auth.jwt, function(req, res) {
  let id = req.query._id;
  Playlist.findById(id).remove().exec()
  .then(function(playlist) {
    res.json(playlist.toJSON()).status(200);
  }, function(err) {
    console.log(err);
    res.status(500);
  });
});

/*router.post('/upload', auth.jwt, multipartyMiddleware, function(req, res) {
  // We are able to access req.files.file thanks to 
  // the multiparty middleware
  var file = req.files.file;
  var data = req.body.data;
  var fileData = fs.readFileSync(file.path);
  var playlistData = req.body.data;


  youtube.playlistItems.list({
    playlistId: playlistData.playlistYoutubeId,
    part: 'snippet',
    maxResults: 50},
    function(err, response) {
      if (err) console.log(err);
      console.log(JSON.stringify(response));
      playlistData.ownerId = req.user._id;
      playlistData.thumbnail = fileData.toString('base64');
      // /playlistData.thumbnailBin = fileData;
      playlistData.videos = response.items.map(function(item, index) {
        return {
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle
        };
      });
      var newPlaylist = new Playlist(playlistData);
      newPlaylist.save()
        .then(function() {
          res.send('New playlist created: ' + playlistData.name).status(200);
        }, function(err) {
          res.send(err.message).status(500);
        });
    });
});*/

router.get('/personal', auth.jwt, getPersonalPlaylists);

router.get('/featured', getFeaturedPlaylists);

router.get('/public', getPublicPlaylist);

function createPlaylist(req, res, next) {
  var playlistData = req.body;
  playlistData.ownerId = req.user._id;

  youtube.playlistItems.list({
    playlistId: playlistData.playlistYoutubeId,
    part: 'snippet',
    maxResults: 50},
    function(err, response) {
      if (err) console.log(err);

      playlistData.videos = response.items.map(function(item, index) {
        return {
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle
        };
      });
      var newPlaylist = new Playlist(playlistData);
      newPlaylist.save()
        .then(function() {
          console.log('New playlist created: ' + playlistData.name);
          res.send('New playlist created: ' + playlistData.name).status(200);
        }, function(err) {
          res.send(err.message).status(500);
        });
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
