class Selector {
    /**
     * Add specific class to the dom element.
     *
     * @param className
     */
    addClass(className) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            let classes = element.className.split(' ');

            classes.push(className);

            element.className = classes.join(' ');
        }

        return this;
    }

    /**
     * Add specific syntax after the selected elements.
     *
     * @param syntax
     */
    after(syntax) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            element.insertAdjacentHTML('afterend', syntax);
        }

        return this;
    }

    /**
     * Find any element matching the handle.
     *
     * @param handle
     */
    constructor(handle = null) {
        if (handle) {
            this.elements = document.querySelectorAll(handle);
        } else {
            this.elements = [];
        }
    }

    /**
     * Return the next sibling for each obtained element.
     *
     * @returns {*}
     */
    next() {
        if (!this.elements.length) {
            return;
        }

        let siblings = new Selector();

        for (let element of this.elements) {
            siblings.elements.push(element.nextSibling);
        }

        return siblings;
    }

    /**
     * Setup event listener for each of obtained elements.
     *
     * @param event
     * @param callback
     */
    on(event, callback) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            element.addEventListener(event, callback);
        }

        return this;
    }

    /**
     * Ability to remove the element.
     */
    remove() {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            element.parentNode.removeChild(element);
        }

        return this;
    }

    /**
     * Ability to remove a class from the dom element.
     *
     * @param className
     */
    removeClass(className) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            let classes = element.className.split(' '),
                index = classes.indexOf(className);

            if (index >= 0) {
                classes.splice(index, 1);

                element.className = classes.join(' ');
            }
        }

        return this;
    }
}

/**
 * Wrapper arount the Selector class.
 *
 * @param handle
 * @returns {Selector}
 */
function $(handle) {
    if (typeof handle === 'object') {
        let element = new Selector();

        element.elements.push(handle);

        return element;
    }

    return new Selector(handle);
}

export default Selector;
export default $;