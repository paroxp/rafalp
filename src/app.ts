import Router from '@koa/router';
import Koa from 'koa';
import KoaCompress from 'koa-compress';
import KoaHTMLMinifier from 'koa-html-minifier';
import KoaStatic from 'koa-static';

import { About } from './components/about';
import { handleErrors } from './components/errors';
import { Home } from './components/home';
import { render } from './components/layout';
import { config } from './config';

const app = new Koa();
const router = new Router();

router.get('home', '/', render(config, Home));
router.get('about', '/about', render(config, About, { subtitle: 'Resume' }));

app.use(KoaStatic(`${__dirname}'/../dist`));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(handleErrors);
app.use(KoaCompress());
app.use(KoaHTMLMinifier({ collapseWhitespace: true }));

app.listen(process.env.PORT || 3000);
