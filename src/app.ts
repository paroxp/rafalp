import Router from '@koa/router';
import Koa, { Middleware } from 'koa';
import serve from 'koa-static';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

import { About } from './components/about';
import { Home } from './components/home';
import { htmlDocument } from './components/layout';
import { config, IConfig } from './config';

const app = new Koa();
const router = new Router();

function render(cfg: IConfig, page: () => ReactElement, overrides?: object): Middleware {
  const content = page();

  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    ctx.body = htmlDocument({ ...cfg, ...overrides }, renderToString(content));
    await next();
  };
}

router.get('home', '/', render(config, Home));
router.get('about', '/about', render(config, About, { subtitle: 'Resume' }));

app.use(serve(`${__dirname}'/../dist`));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
