import Base from './base';
import Router from '../system/router';
import $ from '../system/selector';

class Url extends Base {
    /**
     * Redirect application to different view.
     *
     * @param event
     * @returns boolean
     */
    static redirect(event) {
        var url = this.getAttribute('href');

        event.preventDefault();

        Router.goTo(url);

        $('nav').removeClass('active');

        return false;
    }

    /**
     * Expand the menu on the mobile view.
     *
     * @param event
     * @returns {boolean}
     */
    static toggleMenu(event) {
        event.preventDefault();

        let navigation = $('nav'),
            classes = navigation.elements[0].className === undefined ? [] : navigation.elements[0].className.split(' ');

        if (classes.indexOf('active') >= 0) {
            navigation.removeClass('active');
        } else {
            navigation.addClass('active');
        }

        return false;
    }
}

export default Url;
