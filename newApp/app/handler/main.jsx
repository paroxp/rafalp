import Base from './base.jsx';
import View from '../system/view.jsx';

class Main extends Base {
    index() {
        let template = require('../../../assets/template/home.html');

        View.render(template);
    }

    test() {
        console.log('Testing...');
    }
}

export default Main;