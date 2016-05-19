import express from 'express';
import users from '../controllers/authentication';

const router = express.Router();

router.route('/login')
  .post(users.login);

export default router;
