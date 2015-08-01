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
     * @param callback
     */
    on: function (event, callback) {
        app.nodeAssure(this._wrapped, function (element) {
            element.addEventListener(event, callback);
        });

        return this;
    }

});