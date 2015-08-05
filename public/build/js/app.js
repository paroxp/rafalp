var Application = Application || {},

    $body = $('body');

$(document)
    .ready(function () {
        $body
            .on('click', '[data-modal]', Application.modal.open)
            .on('click', '[role=dialog] [data-close]', Application.modal.close);

        // Centralise the body on the go.
        $(window)
            .on('resize', Application.position.centraliseBody)
            .trigger('resize');

        // Enabling validation for our forms.
        $('form')
            .validate(Application.validator.validationErrors);

        // Making sure to reveal website content when everything is ready.
        $('#initial')
            .fadeOut();
    });
