import Router from '@koa/router';
import Koa from 'koa';
import serve from 'koa-static';

import { About } from './components/about';
import { Home } from './components/home';
import { render } from './components/layout';
import { config } from './config';

const app = new Koa();
const router = new Router();

router.get('home', '/', render(config, Home));
router.get('about', '/about', render(config, About, { subtitle: 'Resume' }));

app.use(serve(`${__dirname}'/../dist`));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
