
import { Context, Middleware, Next } from 'koa';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

import { Config } from '../config';
import { htmlDocument } from '../views/layout';

export function render(cfg: Config, page: () => ReactElement, overrides?: object): Middleware {
  const content = page();

  return async (ctx: Context, next: Next): Promise<void> => {
    ctx.body = htmlDocument({ ...cfg, ...overrides }, renderToString(content));
    await next();
  };
}
