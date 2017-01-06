'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  groups: [String],
  links: [{
    id: String,
    title: String,
    publishedAt: Date,
    description: String,
    channelTitle: String
  }],
  thumbnail: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
