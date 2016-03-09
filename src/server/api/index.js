import auth from './auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import todos from './todos';
import articles from './articles';
import connect from './mongoose';

const app = express();

connect();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/todos', todos);
app.use('/articles', articles);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
