var app = app || {};

/**
 * element.js
 *
 * Functionality strictly aiming at the elements.
 */
_.extend(app, {

  /**
   * Insert some HTML after just after the end of an element.
   *
   * @param html
   * @returns {app}
   */
  after: function(html) {
    app.nodeAssure(this, function(element) {
      element.insertAdjacentHTML('afterend', html);
    });

    return this;
  },

  /**
   * Append one element with the other.
   *
   * @param $element
   * @returns {app}
   */
  append: function($element) {
    app.nodeAssure(this, function(element) {
      element.appendChild($element);
    });

    return this;
  },

  /**
   * Insert some HTML just before the start of an element.
   *
   * @param html
   * @returns {app}
   */
  before: function(html) {
    app.nodeAssure(this, function(element) {
      element.insertAdjacentHTML('beforebegin', html);
    });

    return this;
  },

  /**
   * Return all children found inside an element.
   *
   * @returns {HTMLElement}
   */
  child: function() {
    var results = [];

    app.nodeAssure(this, function(element) {
      _.each(element.children, function(value) {
        results.push(value);
      });
    });

    return $(results);
  },

  /**
   * Clone specific element.
   *
   * @returns {Node}
   */
  clone: function() {
    return this.cloneNode(true);
  },

  /**
   * Set/Get some text in/from the element;
   *
   * @param text
   * @returns {*}
   */
  content: function(text) {
    if (typeof text !== 'undefined') {
      app.nodeAssure(this, function(element) {
        element.innerHTML = text;
      });

      return this;
    } else {
      return this.textContent;
    }
  },

  /**
   * Check if the element is empty.
   *
   * @returns {app}
   */
  empty: function() {
    app.nodeAssure(this, function(element) {
      element.innerHTML = '';
    });

    return this;
  },

  /**
   * Find any selectors inside our element.
   *
   * @param selector
   * @returns {HTMLElement}
   */
  find: function(selector) {
    var results = [];

    app.nodeAssure(this, function(element) {
      _.each(element.querySelectorAll(selector), function(value) {
        results.push(value);
      });
    });

    return $(results);
  },

  /**
   * Calculate element's height.
   *
   * @param includeMargin
   * @returns {number}
   */
  height: function(includeMargin) {
    includeMargin = includeMargin || false;

    var element = this,
      height = element.offsetHeight;

    if (includeMargin) {
      var style = getComputedStyle(element);

      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    }

    return height;
  },

  /**
   * Set/Get some HTML in/from the element.
   *
   * @param html
   * @returns {*}
   */
  html: function(html) {
    if (typeof html !== 'undefined') {
      app.nodeAssure(this, function(element) {
        element.innerHTML = html;
      });

      return this;
    } else {
      return this.innerHTML;
    }
  },

  /**
   * Attempt to find the next sibling.
   *
   * @returns {HTMLElement}
   */
  next: function() {
    return this.nextElementSibling;
  },

  /**
   * Determine the offset values of an element.
   *
   * @returns {{top: number, left: number}}
   */
  offset: function() {
    var rect = this.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },

  /**
   * Aim for the element's parent.
   *
   * @returns {HTMLElement}
   */
  parent: function() {
    return $(this.parentNode);
  },

  /**
   * Get a position of an element.
   *
   * @returns {{left: (Number|number), top: (Number|number)}}
   */
  position: function() {
    return {
      left: this.offsetLeft,
      top: this.offsetTop
    };
  },

  /**
   * Prepend one element with the other.
   *
   * @param $element
   * @returns {app}
   */
  prepend: function($element) {
    app.nodeAssure(this, function(element) {
      element.insertBefore($element, element.firstChild);
    });

    return this;
  },

  /**
   * Attempt to find the next sibling.
   *
   * @returns {HTMLElement}
   */
  prev: function() {
    return this.previousElementSibling;
  },

  /**
   * Remove an element from existence.
   *
   * @returns {boolean}
   */
  remove: function() {
    app.nodeAssure(this, function(element) {
      element.parentNode.removeChild(element);
    });

    return true;
  },

  /**
   * Localise any siblings of an element.
   *
   * @param selector
   * @returns {HTMLElement}
   */
  siblings: function(selector) {
    var siblings = [];

    app.nodeAssure(this, function(element) {
      var sibling = element.parentNode.firstChild,
        selected = typeof selector !== 'undefined' ? element.parentNode.querySelectorAll(selector) : [],
        find = function(child) {
          var result = false;

          _.each(selected, function(element) {
            if (element === child) {
              result = true;
            }
          });

          return result;
        };

      for (; sibling; sibling = sibling.nextSibling) {
        if (selected.length) {
          if (sibling.nodeType === 1 && sibling !== element && find(sibling)) {
            siblings.push(sibling);
          }
        } else {
          if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
          }
        }
      }
    });

    return $(siblings);
  },

  /**
   * Ability to obtain or set a value.
   *
   * @param value
   * @returns {*}
   */
  val: function(value) {
    value = value || false;

    if (value) {
      this.value = value;

      return this;
    }

    return this.value;
  }

});
