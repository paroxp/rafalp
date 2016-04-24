import Url from './event/url';
import Router from './system/router';
import $ from './system/selector';

import '!style!css!sass!../../scss/initial.scss';
import '!style!css!sass!../../scss/app.scss';

let router = new Router();

$('nav a')
    .on('click', Url.redirect);

router.run();