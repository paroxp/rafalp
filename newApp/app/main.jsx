import Url from './event/url.jsx';
import Router from './system/router.jsx';
import $ from './system/selector.jsx';

let router = new Router();

$('nav a')
    .on('click', Url.redirect);

router.run();