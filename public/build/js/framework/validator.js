var app = app || {};

/**
 * validator.js
 *
 * Functionality responsible for the form validation.
 */
_.extend(app, {

    /**
     * Run the validation system.
     */
    validate: function (handleErrors) {
        handleErrors = handleErrors || function (errors, $form) {
            };

        $(this)
            .on('submit', app.validator.validateForm)
            .on('validation-error', function () {
                handleErrors(app.validator.getErrors($(this).attr('data-validation')), this);
            });

        app.nodeAssure($(this), function (element) {
            var $form = $(element),
                uuid = app.guid();

            $form
                .attr('data-validation', uuid);
        });
    },

    /**
     * Validator library.
     */
    validator: {

        /**
         * Shorten the way to add any validation errors.
         *
         * @param error
         * @param name
         * @param formId
         */
        addError: function (error, name, formId) {
            // Make sure object item for our form exists.
            app.validator.validationErrors[formId] = app.validator.validationErrors[formId] || {};

            app.validator.validationErrors[formId][name] = error;
        },

        /**
         * Reset the error log.
         */
        clearErrorLog: function () {
            app.validator.validationErrors = {};

            return app.validator;
        },

        /**
         * Pull out any errors on request.
         *
         * @param formId
         * @returns {*}
         */
        getErrors: function (formId) {
            formId = formId || null;

            if (formId) {
                return app.validator.validationErrors[formId];
            }

            return app.validator.validationErrors;
        },

        /**
         * Go through known attributes and validate them.
         *
         * @param $form
         */
        validateAttribute: function ($form) {
            var formId = $form.attr('data-validation'),
                error = '', name = '';

            // Validate required fields.
            _.each($form.find('[required]'), function (input) {
                name = input.getAttribute('name');
                error = input.getAttribute('data-error') || 'Field "' + name + '" is required...';

                if (!app.validator.validateRequired(input.value)) {
                    app.validator.addError(error, name, formId);
                }
            });

            return app.validator;
        },

        /**
         * Verify if email address is correct.
         *
         * @param value
         * @returns {boolean}
         */
        validateEmail: function (value) {
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            return regex.test(value);
        },

        /**
         * Validate the form.
         *
         * @param e
         * @returns {boolean}
         */
        validateForm: function (e) {
            e.preventDefault();
            var $form = this,
                uuid = $form.attr('data-validation'),
                $inputs = $form.find('input');

            app.validator
                .clearErrorLog()
                .validateType(uuid, $inputs)
                .validateAttribute($form);

            if (!_.isEmpty(app.validator.validationErrors)) {
                e.preventDefault();

                $(this)
                    .trigger('validation-error');

                return false;
            }
            return false;
        },

        /**
         * Verify if given value is a number.
         *
         * @param value
         * @returns {*}
         */
        validateNumber: function (value) {
            return _.isNumber(parseFloat(value));
        },

        /**
         * Verify if value is provided.
         *
         * @param value
         * @returns {boolean|*}
         */
        validateRequired: function (value) {
            return !_.isNull(value) && !_.isUndefined(value) && (_.isNumber(value) || value.length > 0);
        },

        /**
         * Verify if form data is a correct type.
         *
         * @param formId
         * @param $inputs
         */
        validateType: function (formId, $inputs) {
            var error = '', name = '';

            _.each($inputs, function (input) {
                name = input.getAttribute('name');

                switch (input.getAttribute('type')) {
                    case 'email':
                        if (!app.validator.validateEmail(input.value)) {
                            error = input.getAttribute('data-error') || 'Please insert a valid email address into "' + name + '" field...';

                            app.validator.addError(error, name, formId);
                        }
                        break;
                    case 'number':
                        if (!app.validator.validateNumber(input.value)) {
                            error = input.getAttribute('data-error') || 'Please insert a valid number into "' + name + '" field...';

                            app.validator.addError(error, name, formId);
                        }
                        break;
                }
            });

            return app.validator;
        },

        /**
         * Placeholder for any errors.
         */
        validationErrors: {}

    }

});
