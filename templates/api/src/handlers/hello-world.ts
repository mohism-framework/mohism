import {
  AHttpHandler,
  HTTP_METHODS,
  HTTP_PARAM_LOCATION as LOCATION,
  HttpPick,
  IDefinition,
  IMiddleware,
} from '@mohism/core';
import { Dict } from '@mohism/utils';

import auth from '../middlewares/auth';

class HelloWorld extends AHttpHandler {
  middlewares(): Array<IMiddleware> {
    return [auth];
  }
  params(): Dict<IDefinition> {
    return {
      err: HttpPick('err').in(LOCATION.QUERY).boolean().default(false),
    };
  }

  method(): HTTP_METHODS {
    return HTTP_METHODS.GET;
  }

  name(): string {
    return '你好，世界。';
  }

  path(): string {
    return '/hello';
  }

  async run(params: Dict<any>): Promise<any> {
    return params;
  }
}

export default new HelloWorld();
