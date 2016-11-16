'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  links: [String]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
