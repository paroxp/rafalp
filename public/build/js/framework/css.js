var app = app || {};

/**
 * css.js
 *
 * Functionality strictly aiming at the element's css.
 */
_.extend(app, {

    /**
     * Ability to modify the CSS on the fly.
     *
     * @param attribute
     * @param value
     */
    css: function (attribute, value) {
        if (typeof value !== 'undefined' || typeof attribute === 'object') {
            app.nodeAssure(this, function (element) {
                if (_.isArray(attribute) || _.isObject(attribute)) {
                    _.each(attribute, function (val, attr) {
                        element.style[attr] = val;
                    });
                } else {
                    element.style[attribute] = value;
                }
            });

            return this;
        } else {
            return getComputedStyle(this)[attribute];
        }
    },

    /**
     * Hide an element.
     */
    hide: function () {
        app.nodeAssure(this, function (element) {
            element.style.display = 'none';
        });

        return this;
    },

    /**
     * Show an element.
     */
    show: function () {
        app.nodeAssure(this, function (element) {
            element.style.display = 'inherit';
        });

        return this;
    }

});