import { Readable } from 'stream';

import Router from '@koa/router';
import { Context, Middleware } from 'koa';
import { SitemapStream, streamToPromise } from 'sitemap';

import { Config } from '../config';


export function sitemapFromRouter(config: Config, { stack }: Router): Middleware {
  const links = stack.map(link => ({
    changefreq: 'monthly',
    priority: link.name === 'about' ? 1.0 : 0.3,
    url: link.path,
  }));

  return async (ctx: Context): Promise<void> => {
    const stream = new SitemapStream( { hostname: config.url } );

    ctx.body = await streamToPromise(Readable.from(links).pipe(stream));
    ctx.type = 'application/xml';
  };
}
