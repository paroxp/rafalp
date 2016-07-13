import Base from './base';
import Router from '../system/router';

class Url extends Base {
    /**
     * Redirect application to different view.
     *
     * @param event
     * @returns boolean
     */
    static redirect(event) {
        var url = event.target.getAttribute('href');

        event.preventDefault();

        Router.goTo(url);

        return false;
    }
}

export default Url;
