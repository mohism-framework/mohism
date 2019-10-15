import IHandler, { magicMount } from '@mohism/core/dist/http/iHandler';
import cors from 'kcors';
import Koa, { Middleware } from 'koa';
import body from 'koa-bodyparser';
import { rainbow } from 'colors';
import { EOL } from 'os';

import exception from '../middleware/exception';
import globalRouter from '../middleware/global-router';
import response from '../middleware/response';
import rightpad from '@mohism/cli-wrapper/dist/libs/utils/rightpad';
import { HTTP_METHODS } from '@mohism/core/dist/http/constant';


export default class MohismApplication {
  koa: Koa;
  middlewares: Array<Middleware>;
  handlers: Array<IHandler>;
  constructor() {
    this.koa = new Koa();
    // default middlers
    this.koa
      .use(cors())
      .use(body())
      .use(response())
      .use(exception());

    this.middlewares = [] as Array<Middleware>;
    this.handlers = [] as Array<IHandler>;
  }

  use(middlewares: Array<Middleware> | Middleware): this {
    if (Array.isArray(middlewares)) {
      this.middlewares = this.middlewares.concat(middlewares);
    } else {
      this.middlewares = this.middlewares.concat([middlewares]);
    }
    return this;
  }

  mount(handler: IHandler): this {
    this.handlers.push(handler);
    return this;
  }

  verbose(): void {
    const colorFy = (str: string): string => {
      const h = str.substr(0, 3);
      switch (h) {
      case 'GET':
        return str.green;
      case 'POS':
        return str.blue;
      case 'PUT':
        return str.cyan;
      case 'DEL':
        return str.red;
      case 'HEA':
      case 'OPT':
        return str.white;
      default:
        return str.grey;
      }
    };
    const outputs: Array<string> = [];
    outputs.push('');
    outputs.push(rainbow('Mohism!'));
    // outputs.push(`${rightpad('method', 16)}${rightpad('path', 24)}${rightpad('desc', 24)}`.yellow);
    this.handlers.forEach((handler: IHandler): void => {
      outputs.push(`${colorFy(rightpad(HTTP_METHODS[handler.method()], 16))}${rightpad(`${handler.group()}${handler.path()}`, 24)}${colorFy(rightpad(handler.name(), 24))}`.white);
    });
    console.log(outputs.join(EOL));
  }

  start(port: number): void {
    // bind middlewares
    this.middlewares.forEach((mid: Middleware): void => {
      this.koa.use(mid);
    });

    // mounted routes here
    this.handlers.forEach((handler: IHandler): void => {
      magicMount(globalRouter, handler);
    });

    this.koa.use(globalRouter.routes());

    this.koa.listen(port);
  }
}