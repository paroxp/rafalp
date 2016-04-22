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
    constructor(handle = '') {
        this.handle = handle;
        this.elements = document.querySelectorAll(handle);
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

function $(handle) {
    return new Selector(handle);
}

export default Selector;
export default $;