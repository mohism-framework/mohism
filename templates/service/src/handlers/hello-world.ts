import { HTTP_METHODS, HTTP_PARAM_LOCATION as LOCATION } from '@mohism/core/dist/http/constant';
import { IDefinition } from '@mohism/core/dist/http/definitions/iDefinition';
import Pick from '@mohism/core/dist/http/definitions/pick';
import IHandler from '@mohism/core/dist/http/iHandler';
import { Dict } from '@mohism/utils/dist/libs/type';

class HelloWorld implements IHandler {
  name(): string {
    return 'hello,world';
  }
  params(): Dict<IDefinition> {
    return {
      word: Pick('word').in(LOCATION.QUERY).string().isIn(['world', 'lucy']).default('world').contains('l').length(0, 10),
      age: Pick('age').in(LOCATION.BODY).number().required().gt(16).lte(60).not([49]),
    };
  }

  method(): HTTP_METHODS {
    return HTTP_METHODS.POST;
  }

  group(): string {
    return '';
  }

  path(): string {
    return '/hello';
  }

  async run(params: Dict<any>): Promise<any> {
    params.age++;
    return params;
  }
}

export default new HelloWorld();