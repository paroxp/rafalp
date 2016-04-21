import Url from './event/url.jsx';
import Router from './system/router.jsx';
import $ from './system/selector.jsx';

import '!style!css!sass!../../scss/initial.scss';
import '!style!css!sass!../../scss/app.scss';

let router = new Router();

$('nav a')
    .on('click', Url.redirect);

router.run();