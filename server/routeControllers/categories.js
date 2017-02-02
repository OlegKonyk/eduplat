'use strict';
const Category = require('../models/Category.js');

function getAll(req, res, next) {
  let mode = req.query.mode;
  if (mode === 'unwind') {
    console.log('lets unwind it all');
    Category.aggregate([
      {$unwind: "$subCategories"},
      //{$unwind: "$categories.subCategories"},
      {$project: {_id: 0, name: '$name',
        //category: '$subCategories.name',
        subCategory: '$subCategories.name'}}]).exec()
      .then(function(categories) {
        res.send(categories).status(200);
      });
  } else {
    Category.find({}).exec()
      .then(function(categories) {
        res.send(categories).status(200);
      });
  }
}

function create(req, res, next) {
  var newCategory = req.body;
  userSpecificCategoryProperties.call(newCategory, req.user);
  newCategory.subCategories.forEach(function(subCategory) {
    userSpecificCategoryProperties.call(subCategory, req.user);
  });
  var category = new Category(newCategory);
  category.save()
    .then(function() {
      res.sendStatus(200);
    });
}

function userSpecificCategoryProperties(user) {
  this.authorId = user._id;
  this.approved = user.roles.indexOf('admin') > -1;
}

module.exports = {getAll, create};
