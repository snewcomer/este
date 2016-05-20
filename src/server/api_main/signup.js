import express from 'express';
import users from '../controllers/authentication';

const router = express.Router();

router.route('/')
  .post(users.signup);

export default router;
