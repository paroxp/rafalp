import $ from '../system/selector';
import Base from './base';
import view from '../config/view';

class PageTransition extends Base {
    /**
     * Add specific classes to the containers.
     *
     * @param current
     * @returns {Promise}
     */
    static addClasses(current) {
        return new Promise(function (resolve, reject) {
            current.addClass(view.leaveClass);
            current.next().addClass(view.enterClass);

            resolve(current);
        });
    }

    /**
     * Delay next action by given timeout.
     *
     * @param current
     * @returns {Promise}
     */
    static delay(current) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => resolve(current), view.timeout);
        });
    }

    /**
     * Destroy previous container.
     *
     * @param current
     * @returns {Promise<T>|Promise}
     */
    static destroy(current) {
        return new Promise(function (resolve, reject) {
            let next = current.next();

            current.remove();

            resolve(next);
        });
    }

    /**
     * Display new container.
     *
     * @param template
     * @returns {Promise<T>|Promise}
     */
    static display(template) {
        return new Promise(function (resolve, reject) {
            let current = $(view.container);

            current.after(template);

            resolve(current);
        });
    }

    /**
     * Remove class from our container.
     *
     * @param next
     * @returns {Promise}
     */
    static removeClasses(next) {
        return new Promise(function (resolve, reject) {
            next.removeClass(view.enterClass);

            resolve(next);
        });
    }

    /**
     * Run the transition.
     *
     * @param template
     */
    static run(template) {
        PageTransition.display(template)
            .then(PageTransition.addClasses)
            .then(PageTransition.delay)
            .then(PageTransition.destroy)
            .then(PageTransition.removeClasses);
    }
}

export default PageTransition;