import { IMiddleware, HttpPick, HTTP_PARAM_LOCATION } from '@mohism/core';
import { Logger, Dict } from '@mohism/utils';

const logger = Logger();

class Auth implements IMiddleware {
  name(): string {
    return 'auth';
  }
  params() {
    return {
      name: HttpPick('name')
        .in(HTTP_PARAM_LOCATION.QUERY)
        .string()
        .contains('@'),
    };
  }

  async run(params: Dict<any>) {
    logger.info('auth');
    logger.info(params);
  }
}

export default new Auth();