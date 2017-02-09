'use strict';
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  ownerId: String,
  playlistYoutubeId: String,
  name: String,
  groups: [String], // private/public/comersial_id
  categories: [{
    name: String, // Software development
    subCategory: String // Angular
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
  thumbnail: String,
  isFeatured: Boolean
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
