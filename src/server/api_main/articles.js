import express from 'express';
import Article from '../models/article';
import articles from '../controllers/articles';

const router = express.Router();

router.route('/all')
  .get(articles.all)
  .post(articles.add);

router.route('/:id')
  .get(articles.main)
  .put(articles.incrementLikes);

export default router;
