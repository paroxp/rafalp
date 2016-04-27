class Selector {
    /**
     * Add specific class to the dom element.
     *
     * @param className
     */
    addClass(className) {
        this.assure((element) => {
            let classes = element.className.split(' ');

            classes.push(className);

            element.className = classes.join(' ');
        });

        return this;
    }

    /**
     * Add specific syntax after the selected elements.
     *
     * @param syntax
     */
    after(syntax) {
        this.assure((element) => element.insertAdjacentHTML('afterend', syntax));

        return this;
    }

    /**
     * Make a run for each element.
     *
     * @param action
     * @returns {*}
     */
    assure(action) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            action(element);
        }

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
        let siblings = new Selector();

        this.assure((element) => siblings.elements.push(element.nextSibling));

        return siblings;
    }

    /**
     * Setup event listener for each of obtained elements.
     *
     * @param event
     * @param callback
     */
    on(event, callback) {
        this.assure((element) => element.addEventListener(event, callback));

        return this;
    }

    /**
     * Ability to remove the element.
     */
    remove() {
        this.assure((element) => element.parentNode.removeChild(element));

        return this;
    }

    /**
     * Ability to remove a class from the dom element.
     *
     * @param className
     */
    removeClass(className) {
        this.assure((element) => {
            let classes = element.className.split(' '),
                index = classes.indexOf(className);

            if (index >= 0) {
                classes.splice(index, 1);

                element.className = classes.join(' ');
            }
        });

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