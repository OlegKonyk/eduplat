'use strict';
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  authorId: String,
  approved: Boolean,
  subCategories: [{
    name: String,
    description: String,
    authorId: String,
    approved: Boolean
  }]
});

module.exports = mongoose.model('Category', CategorySchema);
