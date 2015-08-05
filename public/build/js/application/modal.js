var Application = Application || {};

/**
 * modal.js
 *
 * Application module responsible for the modals.
 */
_.extend(Application, {

    modal: {

        /**
         * Close the modal on request.
         *
         * @param e
         * @returns {boolean}
         */
        close: function (e) {
            e.preventDefault();

            var $modal = $(this).parent();

            $modal
                .addClass('animated')
                .removeClass('active')
                .removeClass('fadeInLeftBig')
                .addClass('fadeOutLeftBig')
                .fadeOut();

            _.delay(function () {
                $modal
                    .removeClass('fadeOutLeftBig');
            }, 1000);

            $('.overlay')
                .fadeOut();

            $modal
                .find('[data-error]')
                .remove();

            return false;
        },

        /**
         * Open the modal on request.
         *
         * @param e
         * @returns {boolean}
         */
        open: function (e) {
            e.preventDefault();

            var modal = $(this).attr('data-modal');

            $('.overlay')
                .fadeIn();

            $('[role=dialog]' + modal)
                .fadeIn()
                .addClass('active')
                .addClass('animated')
                .removeClass('fadeOutLeftBig')
                .addClass('fadeInLeftBig');

            _.delay(function () {
                $('[role=dialog]' + modal)
                    .removeClass('fadeInLeftBig');
            }, 1000);

            return false;
        }

    }

});
