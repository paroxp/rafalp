import { Middleware } from 'koa';
import { Logger } from 'winston';

export function attachLogger(logger: Logger): Middleware {
  const middleware: Middleware = async (ctx, next): Promise<void> => {
    ctx.log = logger;

    await next();
  };

  return middleware;
}
