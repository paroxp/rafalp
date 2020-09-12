import Router from '@koa/router';
import Koa from 'koa';
import KoaCompress from 'koa-compress';
import KoaHTMLMinifier from 'koa-html-minifier';
import KoaStatic from 'koa-static';

import { config, logger } from './config';
import { sitemapFromRouter } from './controller';
import { attachLogger, captureErrors, handleErrors, render } from './middleware';
import { About } from './views/about';
import { Home } from './views/home';

const app = new Koa();
const router = new Router();

router.get('home', '/', render(config, Home));
router.get('about', '/about', render(config, About, { subtitle: 'Resume' }));
router.get('sitemap', '/sitemap.xml', sitemapFromRouter(config, router));

app.use(attachLogger(logger));

app.use(captureErrors);
app.use(KoaStatic(`${__dirname}'/../dist/public`));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(KoaCompress());
app.use(KoaHTMLMinifier({ collapseWhitespace: true, minifyJS: true, removeComments: true }));

app.on('error', handleErrors);

app.listen(process.env.PORT || 3000);
