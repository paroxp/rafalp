var app = app || {};

/**
 * Modify the underscore call, in order to add some of our functionality.
 *
 * @param selector
 * @returns {*}
 * @private
 */
var $ = function(selector) {
  if (selector instanceof $) return selector;
  if (!(this instanceof $)) return new $(selector);

  var $element = app.element(selector);

  _.extend($element, app);

  return $element;
};

// Make sure, we'll be able to use our up without summoning an element.
_.extend($, app);
