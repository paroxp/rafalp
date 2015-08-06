var Application = Application || {};

/**
 * modal.js
 *
 * Application module responsible for the modals.
 */
_.extend(Application, {

    contact: {

        /**
         * Let's not leave the page when submitting the form.
         *
         * @param e
         * @returns {boolean}
         */
        submit: function (e) {
            e.preventDefault();

            var $form = this;

            // Disable submit button for the sake of greatness.
            $form
                .find('button[type=submit]')
                .attr('disable', 'disable');

            app.request({
                url: $form.attr('action'),
                method: $form.attr('method'),
                success: function (request) {
                    Application.contact.handleMessage($form, request.response.message, 'success');
                },
                error: function (request) {
                    Application.contact.handleMessage($form, request.response.message, 'error');
                }
            });

            return false;
        },

        /**
         * Add a message to the form element.
         *
         * @param $form
         * @param message
         */
        handleMessage: function ($form, message, type) {
            $form
                .before('<p class="message ' + type + '">' + message + '</p>');
        }

    }

});
