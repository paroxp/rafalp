import Router from '@koa/router';
import Koa from 'koa';
import KoaCompress from 'koa-compress';
import KoaHTMLMinifier from 'koa-html-minifier';
import KoaStatic from 'koa-static';

import { config } from './config';
import { captureErrors, handleErrors, render } from './middleware';
import { About } from './views/about';
import { Home } from './views/home';

const app = new Koa();
const router = new Router();

router.get('home', '/', render(config, Home));
router.get('about', '/about', render(config, About, { subtitle: 'Resume' }));

app.use(captureErrors);
app.use(KoaStatic(`${__dirname}'/../dist`));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(KoaCompress());
app.use(KoaHTMLMinifier({ collapseWhitespace: true }));

app.on('error', handleErrors);

app.listen(process.env.PORT || 3000);
