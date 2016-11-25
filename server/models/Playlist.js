'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  groups: [String],
  links: [String],
  thumbnail: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
