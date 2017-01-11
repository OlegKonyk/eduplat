'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  playlistYoutubeId: String,
  name: String,
  groups: [String], // private/public/comersial_id
  categories: [{
    masterName: String, // Software development
    categoryName: String, // JavaScript
    subName: String // Angular
  }],
  skillLevels: [String], // Beginer/Intermidiate/Advanced
  tags: [String], // buzz words
  videos: [{
    id: String,
    title: String,
    publishedAt: Date,
    description: String,
    channelTitle: String
  }],
  thumbnail: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
