import auth from './auth';
import signup from './signup';
import articles from './articles';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import connect from './mongoose';
import passport from 'passport';
import passportService from '../services/passport';

const app = express();

connect();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

//middleware for particular route
const requireAuth = passport.authenticate('jwt', { session: false });//no cookie based session
const requireSignin = passport.authenticate('local', { session: false});

app.use('/articles', articles);
app.use('/auth', requireSignin, auth);
app.use('/signup', signup);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;

