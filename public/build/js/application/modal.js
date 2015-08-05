app.extend(app, {

    modal: {

        close: function (e) {
            e.preventDefault();

            var $modal = $(this).parent();

            $modal
                .addClass('animated')
                .removeClass('fadeInLeftBig')
                .addClass('fadeOutLeftBig')
                .fadeOut();

            $('.overlay')
                .fadeOut();

            return false;
        },


        open: function (e) {
            e.preventDefault();

            var modal = $(this).attr('data-modal');

            $('.overlay')
                .fadeIn();

            $('[role=dialog]' + modal)
                .fadeIn()
                .addClass('animated')
                .removeClass('fadeOutLeftBig')
                .addClass('fadeInLeftBig');

            return false;
        }

    }

});
