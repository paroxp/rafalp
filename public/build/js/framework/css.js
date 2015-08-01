/**
 * css.js
 *
 * Functionality strictly aiming at the element's css.
 */
app.extend(app, {

    /**
     * Ability to modify the CSS on the fly.
     *
     * @param attribute
     * @param value
     */
    css: function (attribute, value) {
        if (typeof value !== 'undefined') {
            app.nodeAssure(this.all(), function (element) {
                if (app.isArray(attribute) || app.isObject(attribute)) {
                    app.each(attribute, function (val, attr) {
                        element.style[attr] = val;
                    });
                } else {
                    element.style[attribute] = value;
                }
            });

            return this;
        } else {
            return getComputedStyle(this.single())[attribute];
        }
    },

    /**
     * Hide an element.
     */
    hide: function () {
        app.nodeAssure(this.all(), function (element) {
            element.style.display = 'none';
        });

        return this;
    },

    /**
     * Show an element.
     */
    show: function () {
        app.nodeAssure(this.all(), function (element) {
            element.style.display = '';
        });

        return this;
    }

});