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

            var $form = this,
                json,
                data = new FormData($form);

            // Add an AJAX spinner.
            $form
                .parent()
                .find('h2 span')
                .html('<i class="fa fa-spinner fa-spin"></i>');

            // Disable submit button for the sake of greatness.
            $form
                .find('button[type=submit]')
                .attr('disabled', 'disabled');

            // Remove any previous messages.
            $form
                .parent()
                .find('p.message, [data-error]')
                .remove();

            app.request({
                url: $form.attr('action'),
                method: $form.attr('method'),
                data: data,
                success: function (request) {
                    // Remove AJAX spinner.
                    $form
                        .parent()
                        .find('h2 span')
                        .html('');


                    json = JSON.parse(request.responseText);

                    if (request.status === 200) {
                        Application.contact.handleMessage($form, json.message, 'success');

                        // Add a check.
                        $form
                            .parent()
                            .find('h2 span')
                            .html('<i class="fa fa-check green"></i>');

                    } else if (request.status === 400) {
                        _.each(json.data, function (value, key) {
                            app.validator.addError(value[0], key, $form.attr('data-validation'));
                        });

                        $form
                            .trigger('validation-error');

                        $form
                            .find('button[type=submit]')
                            .unset('disabled');

                        Application.contact.handleMessage($form, json.message, 'error');
                    } else {
                        $form
                            .find('button[type=submit]')
                            .unset('disabled');

                        Application.contact.handleMessage($form, json.message, 'error');
                    }
                },
                error: function (request) {
                    // Remove AJAX spinner.
                    $form
                        .parent()
                        .find('h2 span')
                        .html('');

                    $form
                        .find('button[type=submit]')
                        .unset('disabled');

                    json = JSON.parse(request.responseText);

                    Application.contact
                        .handleMessage($form, 'We couldn\'t send your message... Please try again later.', 'error');
                }
            });

            return false;
        },

        /**
         * Add a message to the form element.
         *
         * @param $form
         * @param message
         * @param type
         */
        handleMessage: function ($form, message, type) {
            $form
                .before('<p class="message ' + type + '">' + message + '</p>');
        }

    }

});
