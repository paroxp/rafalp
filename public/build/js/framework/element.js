/**
 * element.js
 *
 * Functionality strictly aiming at the elements.
 */
app.extend(app, {

    /**
     * Insert some HTML after just after the end of an element.
     *
     * @param html
     * @returns {app}
     */
    after: function (html) {
        app.nodeAssure(this.all(), function (element) {
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
    append: function ($element) {
        app.nodeAssure(this.all(), function (element) {
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
    before: function (html) {
        app.nodeAssure(this.all(), function (element) {
            element.insertAdjacentHTML('beforebegin', html);
        });

        return this;
    },

    /**
     * Return all children found inside an element.
     *
     * @returns {app}
     */
    children: function () {
        var results = [];

        app.nodeAssure(this.all(), function (element) {
            app.each(element.children, function (value) {
                results.push(value);
            });
        });

        this._wrapped = results;

        return this;
    },

    /**
     * Clone specific element.
     *
     * @returns {Node}
     */
    clone: function () {
        return this.single().cloneNode(true);
    },

    /**
     * Check if the element is empty.
     *
     * @returns {boolean}
     */
    empty: function () {
        return this.single().innerHTML === '';
    },

    /**
     * Find any selectors inside our element.
     *
     * @param selector
     * @returns {app}
     */
    find: function (selector) {
        var results = [];

        app.nodeAssure(this.all(), function (element) {
            app.each(element.querySelectorAll(selector), function (value) {
                results.push(value);
            });
        });

        this._wrapped = results;

        return this;
    },

    /**
     * Set/Get some HTML in/from the element.
     *
     * @param html
     * @returns {*}
     */
    html: function (html) {
        if (typeof html !== 'undefined') {
            app.nodeAssure(this.all(), function (element) {
                element.innerHTML = html;
            });

            return this;
        } else {
            return this.single().innerHTML;
        }
    },

    /**
     * Set/Get some text in/from the element;
     *
     * @param text
     * @returns {*}
     */
    text: function (text) {
        if (typeof text !== 'undefined') {
            app.nodeAssure(this.all(), function (element) {
                element.innerHTML = text;
            });

            return this;
        } else {
            return this.single().textContent;
        }
    },

    /**
     * Attempt to find the next sibling.
     *
     * @returns {HTMLElement}
     */
    next: function () {
        return this.single().nextElementSibling;
    },

    /**
     * Determine the offset values of an element.
     *
     * @returns {{top: number, left: number}}
     */
    offset: function () {
        var rect = this.single().getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    },

    /**
     * Aim for the element's parent.
     *
     * @returns {domLvl1.parentNode|*|Function|Node}
     */
    parent: function () {
        return this.single().parentNode;
    },

    /**
     * Get a position of an element.
     *
     * @returns {{left: (Number|number), top: (Number|number)}}
     */
    position: function () {
        return {left: this.single().offsetLeft, top: this.single().offsetTop};
    },

    /**
     * Prepend one element with the other.
     *
     * @param $element
     * @returns {app}
     */
    prepend: function ($element) {
        app.nodeAssure(this.all(), function (element) {
            element.insertBefore($element, element.firstChild);
        });

        return this;
    },

    /**
     * Attempt to find the next sibling.
     *
     * @returns {HTMLElement}
     */
    prev: function () {
        return this.single().previousElementSibling;
    },

    /**
     * Remove an element from existance.
     */
    remove: function () {
        try {
            return this.single().parentNode.removeChild(this.single());
        } catch (e) {

        }
    },

    /**
     * Localise any siblings of an element.
     *
     * @param selector
     * @returns {app}
     */
    siblings: function (selector) {
        var el = this.single();

        this._wrapped = Array.prototype.filter.call(el.parentNode.children, function (child) {
            if (typeof selector !== 'undefined') {
                return child !== el && app.element(child) === app.element(selector);
            } else {
                return child !== el;
            }
        });

        return this;
    },

    /**
     * Ability to obtain or set a value.
     *
     * @param value
     * @returns {*}
     */
    value: function(value) {
        value = value || false;

        if (value) {
            this.single().value = value;

            return this;
        }

        return this.single().value;
    }

});