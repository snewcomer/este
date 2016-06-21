import express from 'express';
import Article from '../models/article';
import articles from '../controllers/articles';

const router = express.Router();

router.route('')
  .get(articles.all)
  .post(articles.add);

router.route('/:id')
  .get(articles.main)
  .put(articles.incrementLikes);

router.route('/:id/add-comment')
  .put(articles.addComment);

router.route('/:id/remove-comment')
  .put(articles.removeComment);

export default router;
