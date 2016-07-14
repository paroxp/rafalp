import Url from './event/url';
import Form from './event/form';
import Router from './system/router';
import $ from './system/selector';

import '!style!css!sass!../scss/initial.scss';
import '!style!css!sass!../scss/app.scss';

let router = new Router();

$(document)
    .ready(() => {
        $('nav a')
            .on('click', Url.redirect);

        $('form')
            .on('submit', Form.submit);
    });

router.run();