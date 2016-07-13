import Base from './base';
import Request from '../system/request';
import Notification from '../system/notification';
import Stack from '../system/stack';
import $ from '../system/selector';

class Form extends Base {
    /**
     * Submit the form on event.
     *
     * @param event
     * @returns {boolean}
     */
    static submit(event) {
        event.preventDefault();

        let stack = new Stack(),
            form = $(event.target),
            items = form.children('input, textarea, button'),
            action = form.attr('action') || window.location.href;

        items.attr('disabled', 'disabled');

        Request
            .post(action, new FormData(form))
            .then(success)
            .catch(failure);

        return false;

        /////////////

        /**
         * Successful response.
         *
         * @param response
         */
        function success(response) {
            stack.add(new Notification('success', `I've received your message. Thanks!`, 'Cool!'));
        }

        /**
         * Failed response.
         *
         * @param response
         */
        function failure(response) {
            try {
                for (let i = 0; i < Object.keys(response).length; i++) {
                    let key = Object.keys(response)[i];

                    response[key].map((error) => stack.add(new Notification('failure', error, 'Validation Error')));
                }
            } catch (error) {
                var message = "We\'ve found some difficulties on our side... Would you please, come back later?";
                stack.add(new Notification('failure', message, 'Oops!'));
            }

            items.attr('disabled', false);
        }
    }
}

export default Form;