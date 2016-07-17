import Form from './event/form';
import Notification from './event/notification';
import Url from './event/url';
import Router from './system/router';
import $ from './system/selector';

import '!style!css!sass!../scss/initial.scss';
import '!style!css!sass!../scss/app.scss';

let router = new Router();

$(document)
    .on('click', 'nav a', Url.redirect)

    .on('notification::destroy', '.notification', Notification.remove)
    .on('click', '.notification', Notification.close)
    .on('mouseover', '.notification', Notification.reset)

    .on('submit', 'form', Form.submit);

router.run();