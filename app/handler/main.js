import Base from './base';
import View from '../system/view';

class Main extends Base {
    about() {
        let template = require('../../../assets/template/about.html');

        View.render(template);
    }

    contact() {
        let template = require('../../../assets/template/contact.html');

        View.render(template);
    }

    index() {
        let template = require('../../../assets/template/home.html');

        View.render(template);
    }

    notFound() {
        let template = require('../../../assets/template/404.html');

        View.render(template);
    }
}

export default Main;