/**
 * event.js
 *
 * Handle some basic events on the fly.
 */
app.extend(app, {

    /**
     * Unbind an event from an element with a callback function.
     *
     * @param event
     * @param callback
     */
    off: function (event, callback) {
        app.nodeAssure(this._wrapped, function (element) {
            element.removeEventListener(event, callback);
        });

        return this;
    },

    /**
     * Bind an event onto a specific action performed on an element, with a callback function.
     *
     * @param event
     * @param first
     * @param second
     */
    on: function (event, first, second) {
        var func = typeof second !== 'undefined' ? second : first,
            $element = typeof second !== 'undefined' ? $(first) : this;

        app.nodeAssure($element._wrapped, function (element) {
            element.addEventListener(event, func);
        });

        return this;
    },

    /**
     * Trigger a specific event on specific element.
     *
     * @param event
     * @param data
     * @param element
     */
    trigger: function (event, data, element) {
        data = typeof element !== 'undefined' ? data : {};

        var $element = typeof element !== 'undefined' ? $(element) : this,
            e;

        e = document.createEvent('HTMLEvents');
        e.initEvent(event, true, false);

        // This may need to come in some time...
        //if (window.CustomEvent) {
        //    e = new CustomEvent(event, {detail: data});
        //} else {
        //    e = document.createEvent('CustomEvent');
        //    e.initCustomEvent(event, true, true, data);
        //}

        app.nodeAssure($element._wrapped, function (element) {
            element.dispatchEvent(e);
        });

        return this;
    }

});