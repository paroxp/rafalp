var Application = Application || {},

    $body = $('body');

$.extend(Application, {

    centraliseBody: function () {
        var height = $body.height(true),
            windowHeight = window.innerHeight,
            margin = (windowHeight - height) / 2;

        $('header[role=banner]')
            .css('margin-top', margin + 'px');
    },

    /**
     * Decide what to do with any validation errors.
     *
     * @param errors
     * @param form
     */
    validationErrors: function (errors, form) {
        var $element;

        if ($(form).find('[data-error]').all().length) {
            $(form)
                .find('[data-error]')
                .remove();
        }

        $.each(errors, function (error, input) {
            $element = $(form).find('[name=' + input + ']');

            $element
                .after('<small data-error>' + error + '</small>');
        });
    }

});

$(document)
    .ready(function () {
        $body
            .on('click', '[data-modal]', app.modal.open)
            .on('click', '[role=dialog] [data-close]', app.modal.close);

        // Centralise the body on the go.
        Application.centraliseBody();

        // Enabling validation for our forms.
        $('form')
            .validate(Application.validationErrors);

        // Making sure to reveal website content when everything is ready.
        $('#initial')
            .fadeOut();
    });
