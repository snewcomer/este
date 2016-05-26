import api from './api';
import api_main from './api_main';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';

const app = express();

app.use('/api/v1', api);
app.use('/api', api_main);
app.use(frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
