/**
 * core.js
 *
 * Some of our basic functionality, used throughout the framework.
 */
app.extend(app, {

    /**
     * Return all wrapped elements.
     *
     * @returns {app._wrapped|*}
     */
    all: function () {
        return this._wrapped;
    },

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
        } else if (typeof $elements[0] === 'undefined') {
            return [];
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
     * Select single wrapped element.
     *
     * @returns {*}
     */
    single: function () {
        if (typeof this._wrapped !== 'undefined' && this._wrapped.length > 1 && app.type(this._wrapped) === 'object') {
            return this._wrapped[0];
        } else {
            return this._wrapped;
        }
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