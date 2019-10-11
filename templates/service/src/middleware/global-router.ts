/* eslint-disable */
import { existsSync } from 'fs';
import Router from 'koa-router';
import { resolve } from 'path';

const healthRouter = new Router();
const mohismConf = require('../../mohism.json');

healthRouter.get('/:service/ping', async (ctx: any) => ctx.success(mohismConf));
healthRouter.get('/:service/swagger', async (ctx: any) => {
  if (existsSync(resolve(`${__dirname}/../swagger.json`))) {
    ctx.body = require('../swagger.json');
    return;
  }
  // eslint-disable-next-line
  return ctx.success('swagger.json not found');
});

export default (app: any): any => {
  app.use(healthRouter.routes(), healthRouter.allowedMethods());
  return app;
};
