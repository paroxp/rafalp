import Koa from 'koa';

import { config } from '../../config';
import { render } from '../layout';

import { NotFound } from './404';
import { GenericError } from './500';

export async function handleErrors(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  if (ctx.status === 404) {
    return await render(config, NotFound)(ctx, next);
  }

  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;

    await render(config, GenericError)(ctx, next);
  }
}
