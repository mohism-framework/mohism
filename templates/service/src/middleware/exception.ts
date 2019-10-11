/**
 * 兜底格式化未捕获的异常
 */
import { Context, Middleware } from 'koa';

export default (): Middleware => {
  return async (ctx: Context, next: () => Promise<any>): Promise<any> => {
    try {
      return await next();
    } catch (err) {
      return ctx.error(err);
    }
  };
};
