'use strict';
const Category = require('../models/Category.js');

function getAll(req, res, next) {
  Category.find({}).exec()
  .then(function(categories) {
    res.send(categories).status(200);
  });
  //console.log("============>>>>> sending!!!")
  //res.send([{data: "tonastuff"}]).status(200);
}

function create(req, res, next) {
  /*Category.find({}).exec()
  .then(function(categories) {
    res.send(categories).status(200);
  });*/
  console.log(req.body)
  console.log("============>>>>> CREATING!!!")
  res.sendStatus(200);
}

module.exports = {getAll, create};
