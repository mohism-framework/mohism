/* eslint-disable */
import { existsSync } from 'fs';
import Router from 'koa-router';
import { resolve } from 'path';

const healthRouter = new Router().prefix('/:service');
const mohismConf = require('../../mohism.json');

healthRouter.get('/ping', async (ctx: any) => ctx.success(mohismConf));
healthRouter.get('/swagger', async (ctx: any) => {
  if (existsSync(resolve(`${__dirname}/../swagger.json`))) {
    ctx.body = require('../swagger.json');
    return;
  }
  // eslint-disable-next-line
  return ctx.success('swagger.json not found');
});


export default healthRouter;

