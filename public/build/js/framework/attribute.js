/**
 * attribute.js
 *
 * Functionality strictly aiming at the element's attributes.
 */
app.extend(app, {

    /**
     * Control the element's attributes.
     *
     * @param key
     * @param value
     * @returns {*}
     */
    attr: function (key, value) {
        if (typeof value !== 'undefined') {
            app.nodeAssure(this.all(), function (element) {
                element.setAttribute(key, value);
            });

            return this;
        } else {
            return this.single().getAttribute(key);
        }
    },

    /**
     * Add specific class to the element.
     *
     * @param className
     * @returns {app}
     */
    addClass: function (className) {
        if (this.single().classList) {
            this.single().classList.add(className);
        } else {
            this.single().className += ' ' + className;
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
        if (this.single().classList) {
            this.single().classList.contains(className);
        } else {
            new RegExp('(^| )' + className + '( |$)', 'gi').test(this.single().className);
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
        if (this.single().classList) {
            this.single().classList.remove(className);
        } else {
            this.single().className = this.single().className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
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
        if (this.single().classList) {
            this.single().classList.toggle(className);
        } else {
            var classes = this.single().className.split(' '),
                existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            this.single().className = classes.join(' ');
        }

        return this;
    }

});