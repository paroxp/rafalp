var app = app || {};

/**
 * attribute.js
 *
 * Functionality strictly aiming at the element's attributes.
 */
_.extend(app, {

    /**
     * Control the element's attributes.
     *
     * @param key
     * @param value
     * @returns {*}
     */
    attr: function (key, value) {
        if (typeof value !== 'undefined') {
            app.nodeAssure(this, function (element) {
                element.setAttribute(key, value);
            });

            return this;
        } else {
            var result;

            try {
                result = this.getAttribute(key);
            } catch (e) {
                result = null;
            }

            return result;
        }
    },

    /**
     * Add specific class to the element.
     *
     * @param className
     * @returns {app}
     */
    addClass: function (className) {
        if (this.classList) {
            this.classList.add(className);
        } else {
            this.className += ' ' + className;
        }

        return this;
    },

    /**
     * Check if specific class exists on the element.
     *
     * @param className
     * @returns {app}
     */
    hasClass: function (className) {
        if (this.classList) {
            this.classList.contains(className);
        } else {
            new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
        }

        return this;
    },

    /**
     * Remove specific class from the element.
     *
     * @param className
     * @returns {app}
     */
    removeClass: function (className) {
        if (this.classList) {
            this.classList.remove(className);
        } else {
            this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

        return this;
    },

    /**
     * Toggle specific class on the element.
     *
     * @param className
     * @returns {app}
     */
    toggleClass: function (className) {
        if (this.classList) {
            this.classList.toggle(className);
        } else {
            var classes = this.className.split(' '),
                existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            this.className = classes.join(' ');
        }

        return this;
    },

    /**
     * Ability to remove the attribute.
     *
     * @param attribute
     * @returns {app}
     */
    unset: function (attribute) {
        _.each(this, function (element) {
            element.removeAttribute(attribute);
        });

        return this;
    }

});