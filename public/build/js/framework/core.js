var app = app || {};

/**
 * core.js
 *
 * Some of our basic functionality, used throughout the framework.
 */
_.extend(app, {

  /**
   * Select any DOM element.
   *
   * @param selector
   * @returns {*}
   */
  element: function(selector) {
    if (selector && app.ofType(selector) !== 'string') {
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
   * Generate an unique identification.
   *
   * @returns {string}
   */
  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  /**
   * Run specific set of functionality for each detected node.
   *
   * @param nodes
   * @param callback
   */
  nodeAssure: function(nodes, callback) {
    if (_.isArray(nodes) || (_.isObject(nodes) && app.ofType(nodes) === 'nodelist')) {
      _.each(nodes, callback);
    } else {
      callback(nodes);
    }
  },

  /**
   * Run the callback function when the dom is ready.
   *
   * @param callback
   */
  ready: function(callback) {
    if (this.readyState != 'loading') {
      callback();
    } else {
      this.addEventListener('DOMContentLoaded', callback);
    }

    return this;
  },

  /**
   * Determine the type of an object.
   *
   * @param obj
   * @returns {string}
   */
  ofType: function(obj) {
    obj = obj || this;

    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  }

});
