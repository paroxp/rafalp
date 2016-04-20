import Base from './base.jsx';
import Router from '../system/router.jsx';

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
