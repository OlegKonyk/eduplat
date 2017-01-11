'use strict';
const Category = require('../models/Category.js');

function getAll(req, res, next) {
  Category.find({}).exec()
  .then(function(categories) {
    res.send(categories).status(200);
  });
}

function create(req, res, next) {
  var newCategory = req.body;
  // newCategory.authorId = req.user._id;
  // newCategory.approved = (req.user.roles.indexOf('admin') > -1); // temp
  userSpecificCategoryProperties.call(newCategory, req.user);
  newCategory.categories.forEach(function(category) {
    userSpecificCategoryProperties.call(category, req.user);
  });
  console.log(JSON.stringify(newCategory));

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