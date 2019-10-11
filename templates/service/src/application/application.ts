import Koa, { Middleware } from 'koa';
import { IHandler } from '@mohism/core/dist/main';
import cors from 'kcors';
import body from 'koa-bodyparser';

import exception from '../middleware/exception';
import globalRouter from '../middleware/global-router';
import response from '../middleware/response';

export default class MohismApplication {
  koa: Koa;
  constructor() {
    this.koa = new Koa();
    this.koa
      .use(cors())
      .use(body())
      .use(response())
      .use(exception());
  }

  use(middlewares: Array<Middleware>): this {
    middlewares.forEach(m => {
      this.koa.use(m);
    });
    return this;
  }

  mount(handlers: IHandler): this {
    return this;
  }

  start(port:number):void{
    this.koa.use(globalRouter.routes());
    // mounted routes here
    this.koa.listen(port);
  }
}