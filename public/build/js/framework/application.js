/**
 * Modify the underscore call, in order to add some of our functionality.
 *
 * @param selector
 * @returns {*}
 * @private
 */
var _ = function (selector) {
    if (selector instanceof _) return selector;
    if (!(this instanceof _)) return new _(selector);

    this._wrapped = app.element(selector);
    app.extend(this, app);

    return this;
};

// Make sure, we'll be able to use our up without summoning an element.
app.extend(_, app);