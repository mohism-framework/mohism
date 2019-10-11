/**
 * 兜底格式化未捕获的异常
 */
import { Context } from 'koa';

export default async (ctx: Context, next: any): Promise<any> => {
  try {
    return await next();
  } catch (err) {
    return ctx.error(err);
  }
};
