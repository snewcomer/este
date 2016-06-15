import mongoose from 'mongoose';
// var _ = require('lodash');
const Article = mongoose.model('Article');

/**
 * List
 */
exports.all = function (req, res) {
  Article.find({}).exec((err, articles) => {
    if (!err) {
      res.status(200).json(articles).end();
    } else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Article
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

/**
 * Main
 */
exports.main = function (req, res) {
  Article.findOne({}).exec((err, article) => {
    if (!err) {
      res.status(200).json(article).end();
    } else {
      console.log('Error in first query');
    }
  });
};

/**
 * Increment Likes
 */
exports.incrementLikes = function (req, res) {
  Article.findOne({_id: req.params.id}, function (err, article) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    article.likes = article.likes ? article.likes + 1 : 1;
    article.save((err, savedArticle) => {
      res.status(200).send(article);
    })
  });
};
