import Koa from 'koa';

import { config } from '../config';
import { NotFound } from '../views/errors/404';
import { GenericError } from '../views/errors/500';

import { render } from './render';

export async function captureErrors(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
}

// eslint-disable-next-line require-await
export async function handleErrors(err: Error, ctx: Koa.Context): Promise<void> {
  const next = async (): Promise<void> => await Promise.resolve();
  ctx.type = 'html';
  switch (ctx.status) {
    case 404:
      ctx.log.debug('page not found', { path: ctx.path });
      render(config, NotFound)(ctx, next);
      break;
    default:
      ctx.log.error('unhandled error', { error: err.message, path: ctx.path });
      render(config, GenericError)(ctx, next);
  }
}
