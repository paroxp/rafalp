app.extend(app, {

    /**
     * Fade in current element.
     *
     * @param speed
     * @returns {*}
     */
    fadeIn: function (speed) {
        speed = speed || 400;

        app.nodeAssure(this._wrapped, function (element) {
            element.style.display = '';
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

        app.nodeAssure(this._wrapped, function (element) {
            element.style.opacity = 1;

            var last = +new Date(),
                tick = function () {
                    element.style.opacity = +element.style.opacity - (new Date() - last) / speed;
                    last = +new Date();

                    if (+element.style.opacity >= 0) {
                        var call = (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                        element.style.display = 'none';
                    }
                };

            tick();
        });
    }

});
