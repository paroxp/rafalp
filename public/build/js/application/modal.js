app.extend(app, {

    modal: {

        close: function (e) {
            e.preventDefault();

            var $modal = $(this).parent();

            $modal
                .addClass('animated')
                .removeClass('slideInLeft')
                .addClass('slideOutLeft')
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
                .removeClass('slideOutLeft')
                .addClass('slideInLeft');

            return false;
        }

    }

});
