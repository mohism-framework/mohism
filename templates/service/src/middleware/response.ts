import * as Koa from 'koa';
import { MohismConf, UnifiedResponse } from '@mohism/core/dist/utils/globalType';

const mohismConf: MohismConf = require('../../mohism.json');
/**
 * 为context加载response方法
 *
 */
export default async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
  const { appId = 1000 } = mohismConf;

  ctx.success = (data: any) => {
    const body: UnifiedResponse = {
      code: 0,
      message: 'success',
      data,
    };
    ctx.body = body;
  };

  ctx.error = (err: Error | UnifiedResponse | any, extra: any = {}) => {
    if (err instanceof Error) {
      err = {
        code: 500000,
        message: `${err.name}:${err.message}`,
        stack: err.stack,
      };
    }
    err.extra = extra;
    ctx.body = {
      code: appId * 1e6 + err.code,
      message: err.message,
      data: err.extra,
    };
  };
  return next();
};
