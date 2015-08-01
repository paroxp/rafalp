/**
 * Modify the underscore call, in order to add some of our functionality.
 *
 * @param selector
 * @returns {*}
 * @private
 */
var $ = function (selector) {
    if (selector instanceof $) return selector;
    if (!(this instanceof $)) return new $(selector);

    this._wrapped = app.element(selector);
    app.extend(this, app);

    return this;
};

// Make sure, we'll be able to use our up without summoning an element.
app.extend($, app);