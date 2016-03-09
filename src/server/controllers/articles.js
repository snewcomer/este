import mongoose from 'mongoose';
// var _ = require('lodash');
const Article = mongoose.model('Article');

/**
 * List
 */
exports.all = function (req, res) {
  Article.find({}).exec(function(err, articles) {
    if (!err) {
      res.json(articles);
    } else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Topic
 */
exports.add = function (req, res) {
  Article.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};
