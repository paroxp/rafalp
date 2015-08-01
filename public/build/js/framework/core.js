/**
 * core.js
 *
 * Some of our basic functionality, used throughout the framework.
 */
app.extend(app, {

    /**
     * Select any DOM element.
     *
     * @param selector
     * @returns {*}
     */
    element: function (selector) {
        if (selector && app.type(selector) !== 'string') {
            return selector;
        }

        var $elements = document.querySelectorAll(selector);

        if ($elements.length > 1) {
            return $elements;
        } else {
            return $elements[0];
        }
    },

    /**
     * Run specific set of functionality for each detected node.
     *
     * @param nodes
     * @param callback
     */
    nodeAssure: function (nodes, callback) {
        if (app.isArray(nodes) || (app.isObject(nodes) && app.type(nodes) === 'nodelist')) {
            app.each(nodes, callback);
        } else {
            callback(nodes);
        }
    },

    /**
     * Run the callback function when the dom is ready.
     *
     * @param callback
     */
    ready: function (callback) {
        if (this._wrapped.readyState != 'loading') {
            callback();
        } else {
            this._wrapped.addEventListener('DOMContentLoaded', callback);
        }

        return this;
    },

    /**
     * Determine the type of an object.
     *
     * @param obj
     * @returns {string}
     */
    type: function (obj) {
        obj = obj || this._wrapped;

        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    }

});