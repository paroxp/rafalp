import Base from './base.jsx';
import Router from '../system/router.jsx';

class Url extends Base {
    /**
     * Redirect application to different view.
     *
     * @param event
     * @returns {string}
     */
    redirect(event) {
        var url = event.target.getAttribute('href');

        event.preventDefault();

        return Router.goTo(url);
    }
}

export default Url;
