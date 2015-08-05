var app = app || {};

/**
 * fade.js
 *
 * Functionality responsible for fading in/out.
 * Don't judge, first module...
 */
_.extend(app, {

    /**
     * Fade in current element.
     *
     * @param speed
     * @returns {*}
     */
    fadeIn: function (speed) {
        speed = speed || 400;

        app.nodeAssure(this, function (element) {
            element.style.display = 'inherit';
            element.style.opacity = 0;

            var last = +new Date(),
                tick = function () {
                    element.style.opacity = +element.style.opacity + (new Date() - last) / speed;
                    last = +new Date();

                    if (+element.style.opacity < 1) {
                        var call = (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                    }
                };

            tick();
        });

        return this;
    },

    /**
     * Fade out current element.
     *
     * @param speed
     * @returns {*}
     */
    fadeOut: function (speed) {
        speed = speed || 400;

        app.nodeAssure(this, function (element) {
            element.style.display = 'inherit';
            element.style.opacity = 1;

            var last = +new Date(),
                tick = function () {
                    element.style.opacity = +element.style.opacity - (new Date() - last) / speed;
                    last = +new Date();

                    if (+element.style.opacity >= 0) {
                        var call = (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                    } else {
                        element.style.display = 'none';
                    }
                };

            tick();
        });

        return this;
    }

});
