'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  playlistYoutubeId: String,
  name: String,
  groups: [String],
  //videos
  videos: [{
    id: String,
    title: String,
    publishedAt: Date,
    description: String,
    channelTitle: String
  }],
  //thumbnailBin: Buffer,
  thumbnail: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
