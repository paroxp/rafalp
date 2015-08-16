var Application = Application || {};

/**
 * position.js
 *
 * Application module responsible for the JS positioning.
 */
_.extend(Application, {

    /**
     * Initialise validator module.
     */
    layout: {

        /**
         * Calculate the full body height and by calculation centralise it.
         */
        htmlClass: function (e) {
            var elementClass = $(this).attr('data-html-class'),
                $html = $('html');
            console.log(elementClass);

            switch (e.type) {
                case 'mouseenter':
                    $html
                        .addClass(elementClass);
                    break;
                case 'mouseleave':
                    $html
                        .removeClass(elementClass);
                    break;
            }
        }

    }

});
