import Koa from 'koa';
import cors from 'kcors';
import body from 'koa-better-body';
// middlewares

import exception from './middleware/exception';
import globalRouter from './middleware/global-router';
import response from './middleware/response';

import('./database/mongo.conn');
import('./database/redis.conn');


// app
const app: Koa = new Koa();

app.use(cors())
  .use(body())
  .use(response)
  .use(exception);

export default globalRouter(app);
