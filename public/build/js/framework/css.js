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
        app.nodeAssure(this._wrapped, function (element) {
            console.log(element);

            if (app.isArray(attribute) || app.isObject(attribute)) {
                app.each(attribute, function (val, attr) {
                    element.style[attr] = val;
                });
            } else {
                element.style[attribute] = value;
            }
        });
    },

    /**
     * Hide an element.
     */
    hide: function () {
        app.nodeAssure(this._wrapped, function (element) {
            element.style.display = 'none';
        });
    },

    /**
     * Show an element.
     */
    show: function () {
        app.nodeAssure(this._wrapped, function (element) {
            element.style.display = '';
        });
    }

});