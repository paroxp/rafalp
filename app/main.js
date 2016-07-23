import App from './system/app';
import Form from './event/form';
import Notification from './event/notification';
import Url from './event/url';
import $ from './system/selector';

import '!style!css!sass!../scss/app.scss';

$(document)
    .on('click', 'nav a', Url.redirect)
    .on('click', 'nav + a', Url.toggleMenu)

    .on('notification::destroy', '.notification', Notification.hide)
    .on('notification::fire', '.notification', Notification.show)
    .on('click', '.notification', Notification.close)
    .on('mouseover', '.notification', Notification.reset)

    .on('submit', 'form', Form.submit)

    .on('app::run', () => console.info('Application is running.'));

let app = new App();

app.router.run();
